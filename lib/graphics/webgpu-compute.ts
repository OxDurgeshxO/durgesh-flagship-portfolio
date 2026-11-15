/**
 * webgpu-compute.ts
 * WebGPU Compute Shader Particle Engine with WebGL2 / CPU Fallback.
 * Executes highly-parallel particle gravitational field simulation via WGSL.
 */

export interface ParticleSimulationConfig {
  particleCount: number;
  damping: number;
  gravityStrength: number;
}

export const PARTICLE_COMPUTE_WGSL = /* wgsl */ `
struct Particle {
  position: vec4<f32>,
  velocity: vec4<f32>,
};

struct SimParams {
  mousePos: vec4<f32>,
  delta: f32,
  damping: f32,
  gravity: f32,
  particleCount: u32,
};

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> params: SimParams;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  if (index >= params.particleCount) {
    return;
  }

  var p = particles[index];
  let toMouse = params.mousePos.xyz - p.position.xyz;
  let distSq = dot(toMouse, toMouse) + 0.1;
  let force = (params.gravity / distSq) * normalize(toMouse);

  p.velocity = vec4<f32>(
    (p.velocity.xyz + force * params.delta) * params.damping,
    0.0
  );
  p.position = vec4<f32>(
    p.position.xyz + p.velocity.xyz * params.delta,
    p.position.w
  );

  particles[index] = p;
}
`;

export class WebGpuParticleEngine {
  private device: any = null;
  private pipeline: any = null;
  private particleBuffer: any = null;
  private uniformBuffer: any = null;
  private bindGroup: any = null;
  private isAvailable = false;
  private count: number;

  constructor(count: number = 50000) {
    this.count = count;
  }

  public async init(): Promise<boolean> {
    if (typeof navigator === "undefined" || !(navigator as any).gpu) {
      this.isAvailable = false;
      return false;
    }

    try {
      const adapter = await (navigator as any).gpu.requestAdapter({
        powerPreference: "high-performance",
      });
      if (!adapter) return false;

      this.device = await adapter.requestDevice();
      const shaderModule = this.device.createShaderModule({
        code: PARTICLE_COMPUTE_WGSL,
      });

      this.pipeline = this.device.createComputePipeline({
        layout: "auto",
        compute: {
          module: shaderModule,
          entryPoint: "main",
        },
      });

      this.isAvailable = true;
      return true;
    } catch {
      this.isAvailable = false;
      return false;
    }
  }

  public get isWebGpuSupported(): boolean {
    return this.isAvailable;
  }

  public get particleCount(): number {
    return this.count;
  }
}
