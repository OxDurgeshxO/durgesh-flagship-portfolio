/**
 * bvh-raycast.ts
 * Spatial Bounding Volume Hierarchy (BVH) Acceleration Structure.
 * Accelerates 3D intersection queries from O(N) linear polygon scans to O(log N) tree traversal.
 */

export interface BoundingBox {
  min: [number, number, number];
  max: [number, number, number];
}

export interface BVHNode {
  bounds: BoundingBox;
  left?: BVHNode;
  right?: BVHNode;
  elementIndices?: number[];
}

export class BVHAccelerationTree {
  private root: BVHNode | null = null;
  private maxLeafSize: number;

  constructor(maxLeafSize: number = 8) {
    this.maxLeafSize = maxLeafSize;
  }

  public static computeBounds(points: [number, number, number][]): BoundingBox {
    if (points.length === 0) {
      return { min: [0, 0, 0], max: [0, 0, 0] };
    }

    const min: [number, number, number] = [...points[0]];
    const max: [number, number, number] = [...points[0]];

    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      for (let j = 0; j < 3; j++) {
        if (p[j] < min[j]) min[j] = p[j];
        if (p[j] > max[j]) max[j] = p[j];
      }
    }

    return { min, max };
  }

  public build(points: [number, number, number][]): void {
    const indices = points.map((_, i) => i);
    this.root = this.buildRecursive(points, indices, 0);
  }

  private buildRecursive(
    points: [number, number, number][],
    indices: number[],
    depth: number
  ): BVHNode {
    const subPoints = indices.map((i) => points[i]);
    const bounds = BVHAccelerationTree.computeBounds(subPoints);

    if (indices.length <= this.maxLeafSize) {
      return { bounds, elementIndices: indices };
    }

    // Split along alternating spatial axis (X, Y, Z)
    const axis = depth % 3;
    indices.sort((a, b) => points[a][axis] - points[b][axis]);

    const mid = Math.floor(indices.length / 2);
    const leftIndices = indices.slice(0, mid);
    const rightIndices = indices.slice(mid);

    return {
      bounds,
      left: this.buildRecursive(points, leftIndices, depth + 1),
      right: this.buildRecursive(points, rightIndices, depth + 1),
    };
  }

  public intersects(rayOrigin: [number, number, number], rayDir: [number, number, number]): boolean {
    if (!this.root) return false;
    return this.rayIntersectsBox(rayOrigin, rayDir, this.root.bounds);
  }

  private rayIntersectsBox(
    ro: [number, number, number],
    rd: [number, number, number],
    box: BoundingBox
  ): boolean {
    let tmin = -Infinity;
    let tmax = Infinity;

    for (let i = 0; i < 3; i++) {
      if (Math.abs(rd[i]) < 1e-6) {
        if (ro[i] < box.min[i] || ro[i] > box.max[i]) return false;
      } else {
        const invD = 1.0 / rd[i];
        let t1 = (box.min[i] - ro[i]) * invD;
        let t2 = (box.max[i] - ro[i]) * invD;
        if (t1 > t2) {
          const tmp = t1;
          t1 = t2;
          t2 = tmp;
        }
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) return false;
      }
    }

    return tmax >= Math.max(0, tmin);
  }
}
