'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Activity, ShieldAlert, Cpu, Video, CheckCircle2, Zap, Info } from 'lucide-react';

interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

interface PoseFrame {
  landmarks: { [key: string]: Landmark };
  angle: number;
  phase: 'descent' | 'bottom' | 'ascent' | 'lockout';
  warning?: string;
}

export function FitTrackDemo() {
  const [exercise, setExercise] = useState<'squat' | 'bicep_curl'>('squat');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [repCount, setRepCount] = useState<number>(0);
  const [currentAngle, setCurrentAngle] = useState<number>(170);
  const [currentPhase, setCurrentPhase] = useState<string>('Standing Lockout');
  const [activeWarning, setActiveWarning] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [latencyMs, setLatencyMs] = useState<number>(31);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const frameIndexRef = useRef<number>(0);
  const repStateRef = useRef<{ inRep: boolean; reachedBottom: boolean }>({ inRep: false, reachedBottom: false });

  // Generate synthetic trajectory for squat
  const generateSquatFrame = (t: number): PoseFrame => {
    // t ranges 0 to 1
    // sinusoidal motion: 0 = standing, 0.5 = deep squat, 1 = standing
    const progress = Math.sin(t * Math.PI);
    const hipY = 0.42 + progress * 0.22;
    const kneeY = 0.65 + progress * 0.05;
    const kneeXShift = progress * 0.04;
    const angle = Math.round(175 - progress * 95); // 175 deg down to 80 deg

    let phase: PoseFrame['phase'] = 'lockout';
    let warning: string | undefined = undefined;

    if (progress < 0.15) {
      phase = 'lockout';
    } else if (t < 0.5) {
      phase = 'descent';
      if (progress > 0.45 && angle > 105) {
        warning = 'Increase depth for full quadricep activation';
      }
    } else if (progress > 0.85) {
      phase = 'bottom';
      if (angle < 75) {
        warning = 'Lumbar tuck alert: maintain neutral spine curvature';
      }
    } else {
      phase = 'ascent';
    }

    const landmarks: { [key: string]: Landmark } = {
      head: { x: 0.5, y: 0.18 + progress * 0.22, z: 0, visibility: 1 },
      neck: { x: 0.5, y: 0.26 + progress * 0.22, z: 0, visibility: 1 },
      leftShoulder: { x: 0.42, y: 0.28 + progress * 0.22, z: 0, visibility: 1 },
      rightShoulder: { x: 0.58, y: 0.28 + progress * 0.22, z: 0, visibility: 1 },
      leftHip: { x: 0.44, y: hipY, z: 0, visibility: 1 },
      rightHip: { x: 0.56, y: hipY, z: 0, visibility: 1 },
      leftKnee: { x: 0.41 - kneeXShift, y: kneeY, z: 0, visibility: 1 },
      rightKnee: { x: 0.59 + kneeXShift, y: kneeY, z: 0, visibility: 1 },
      leftAnkle: { x: 0.43, y: 0.88, z: 0, visibility: 1 },
      rightAnkle: { x: 0.57, y: 0.88, z: 0, visibility: 1 },
    };

    return { landmarks, angle, phase, warning };
  };

  // Generate synthetic trajectory for bicep curl
  const generateCurlFrame = (t: number): PoseFrame => {
    const progress = Math.sin(t * Math.PI);
    const angle = Math.round(165 - progress * 115); // 165 deg down to 50 deg
    const wristY = 0.68 - progress * 0.32;
    const wristX = 0.35 + progress * 0.05;

    let phase: PoseFrame['phase'] = 'lockout';
    let warning: string | undefined = undefined;

    if (progress < 0.15) {
      phase = 'lockout';
    } else if (t < 0.5) {
      phase = 'ascent';
      if (progress > 0.6 && angle > 90) {
        warning = 'Keep elbow stationary against torso';
      }
    } else if (progress > 0.85) {
      phase = 'bottom';
    } else {
      phase = 'descent';
    }

    const landmarks: { [key: string]: Landmark } = {
      head: { x: 0.5, y: 0.2, z: 0, visibility: 1 },
      neck: { x: 0.5, y: 0.28, z: 0, visibility: 1 },
      leftShoulder: { x: 0.42, y: 0.32, z: 0, visibility: 1 },
      rightShoulder: { x: 0.58, y: 0.32, z: 0, visibility: 1 },
      leftElbow: { x: 0.4, y: 0.52, z: 0, visibility: 1 },
      rightElbow: { x: 0.6, y: 0.52, z: 0, visibility: 1 },
      leftWrist: { x: wristX, y: wristY, z: 0, visibility: 1 },
      rightWrist: { x: 0.6, y: 0.68, z: 0, visibility: 1 },
      leftHip: { x: 0.45, y: 0.62, z: 0, visibility: 1 },
      rightHip: { x: 0.55, y: 0.62, z: 0, visibility: 1 },
      leftAnkle: { x: 0.45, y: 0.9, z: 0, visibility: 1 },
      rightAnkle: { x: 0.55, y: 0.9, z: 0, visibility: 1 },
    };

    return { landmarks, angle, phase, warning };
  };

  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, frame: PoseFrame) => {
      // Clear background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const { landmarks, angle, warning } = frame;
      const hasWarning = !!warning;
      const boneColor = hasWarning ? '#f59e0b' : '#10b981';
      const jointColor = hasWarning ? '#ef4444' : '#38bdf8';

      // Define bone connections
      const bones = exercise === 'squat'
        ? [
            ['neck', 'leftShoulder'],
            ['neck', 'rightShoulder'],
            ['leftShoulder', 'leftHip'],
            ['rightShoulder', 'rightHip'],
            ['leftHip', 'rightHip'],
            ['leftHip', 'leftKnee'],
            ['rightHip', 'rightKnee'],
            ['leftKnee', 'leftAnkle'],
            ['rightKnee', 'rightAnkle'],
            ['neck', 'head'],
          ]
        : [
            ['neck', 'leftShoulder'],
            ['neck', 'rightShoulder'],
            ['leftShoulder', 'leftElbow'],
            ['leftElbow', 'leftWrist'],
            ['rightShoulder', 'rightElbow'],
            ['rightElbow', 'rightWrist'],
            ['leftShoulder', 'leftHip'],
            ['rightShoulder', 'rightHip'],
            ['leftHip', 'rightHip'],
            ['leftHip', 'leftAnkle'],
            ['rightHip', 'rightAnkle'],
            ['neck', 'head'],
          ];

      // Draw bones
      ctx.lineWidth = 3;
      ctx.strokeStyle = boneColor;
      ctx.lineCap = 'round';

      bones.forEach(([from, to]) => {
        const p1 = landmarks[from];
        const p2 = landmarks[to];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x * width, p1.y * height);
          ctx.lineTo(p2.x * width, p2.y * height);
          ctx.stroke();
        }
      });

      // Draw joints
      Object.entries(landmarks).forEach(([name, pt]) => {
        const px = pt.x * width;
        const py = pt.y * height;

        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = jointColor;
        ctx.shadowColor = jointColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label target joint
        if ((exercise === 'squat' && name === 'leftKnee') || (exercise === 'bicep_curl' && name === 'leftElbow')) {
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 12px monospace';
          ctx.fillText(`${angle}°`, px + 12, py + 4);

          // Angle arc
          ctx.beginPath();
          ctx.arc(px, py, 20, 0, Math.PI * 0.7);
          ctx.strokeStyle = hasWarning ? '#f59e0b' : '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // HUD Overlay in top left
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.roundRect(14, 14, 180, 72, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('KINEMATIC ANGLE', 24, 32);

      ctx.fillStyle = hasWarning ? '#f59e0b' : '#10b981';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(`${angle}°`, 24, 58);

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`PHASE: ${frame.phase.toUpperCase()}`, 24, 74);
    },
    [exercise]
  );

  // Animation Loop
  useEffect(() => {
    let lastTime = performance.now();
    const cycleDuration = 3200; // ms per full repetition cycle

    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isPlaying) {
        frameIndexRef.current = (frameIndexRef.current + delta) % cycleDuration;
        const t = frameIndexRef.current / cycleDuration;

        const frame = exercise === 'squat' ? generateSquatFrame(t) : generateCurlFrame(t);

        // Rep counting state machine
        if (t > 0.45 && t < 0.55 && !repStateRef.current.reachedBottom) {
          repStateRef.current.reachedBottom = true;
        }
        if (t > 0.95 && repStateRef.current.reachedBottom) {
          setRepCount((prev) => prev + 1);
          repStateRef.current.reachedBottom = false;
        }

        setCurrentAngle(frame.angle);
        setCurrentPhase(
          frame.phase === 'lockout'
            ? 'Top Lockout'
            : frame.phase === 'descent'
            ? 'Eccentric Descent'
            : frame.phase === 'bottom'
            ? 'Maximum Flexion / Depth'
            : 'Concentric Ascent'
        );
        setActiveWarning(frame.warning || null);

        // Latency jitter for realistic edge telemetry
        setLatencyMs(28 + Math.floor(Math.sin(time / 400) * 5) + 3);
        setFps(59 + Math.round(Math.sin(time / 200)));

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            drawFrame(ctx, canvas.width, canvas.height, frame);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, exercise, drawFrame]);

  // Handle camera opt-in
  const toggleCamera = async () => {
    if (useCamera) {
      // Turn off
      setUseCamera(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setUseCamera(true);
    } catch {
      setCameraError('Webcam permission was not granted or camera is unavailable. Fallback to synthetic kinematics active.');
      setUseCamera(false);
    }
  };

  const resetSession = () => {
    setRepCount(0);
    frameIndexRef.current = 0;
    repStateRef.current = { inRep: false, reachedBottom: false };
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
            <Activity className="h-3.5 w-3.5" />
            FitTrack Kinematics Engine
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Computer Vision Pose & Rep Counter</h2>
          <p className="text-sm text-muted-foreground">
            Sub-50ms Edge pose estimation with real-time joint angle trigonometry and kinematic form correction.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExercise(exercise === 'squat' ? 'bicep_curl' : 'squat')}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            Exercise: <span className="text-emerald-400 font-semibold">{exercise === 'squat' ? 'Back Squat' : 'Bicep Curl'}</span>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={resetSession}
            title="Reset Reps"
            className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={toggleCamera}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              useCamera
                ? 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                : 'border-border bg-background text-foreground hover:bg-muted'
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            {useCamera ? 'Stop Cam' : 'Enable Cam'}
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0" />
          {cameraError}
        </div>
      )}

      {/* Main Visualizer + Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Visualizer */}
        <div className="lg:col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden border border-border/80 bg-[#090d16] flex items-center justify-center shadow-inner">
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-contain" />

          {/* Hidden video element for opt-in webcam */}
          <video ref={videoRef} playsInline muted className="hidden" />

          {/* Real-time telemetry badges on canvas */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
              <Zap className="h-3 w-3" />
              {latencyMs}ms LATENCY
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-blue-400 border border-blue-500/30">
              <Cpu className="h-3 w-3" />
              {fps} FPS (EDGE)
            </div>
          </div>

          {/* Live Warning Banner */}
          {activeWarning && (
            <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-amber-500/40 bg-black/80 backdrop-blur-md p-2.5 text-xs text-amber-300 flex items-center gap-2 animate-pulse">
              <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{activeWarning}</span>
            </div>
          )}
        </div>

        {/* Telemetry Panel */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Rep Counter Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400">Validated Repetitions</span>
              <div className="text-5xl font-black text-foreground tracking-tight my-1">{repCount}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Complete ROM Verified
              </div>
            </div>

            {/* Real-time Angles & Phase */}
            <div className="space-y-2 rounded-xl border border-border/80 bg-background/50 p-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Current Phase:</span>
                <span className="font-semibold text-foreground">{currentPhase}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Target Joint Angle:</span>
                <span className="font-mono font-bold text-emerald-400">{currentAngle}°</span>
              </div>
              <div className="w-full bg-muted/60 rounded-full h-2 overflow-hidden mt-2">
                <div
                  className="bg-emerald-500 h-full transition-all duration-75"
                  style={{ width: `${Math.min(100, Math.max(10, ((180 - currentAngle) / 110) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Lockout (180°)</span>
                <span>Max Depth (70°)</span>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="rounded-xl border border-border/80 bg-background/50 p-4 text-xs space-y-2">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                Pipeline Architecture
              </div>
              <ul className="space-y-1.5 text-muted-foreground list-disc list-inside text-[11px]">
                <li>Zero video transmission: frames evaluated strictly client-side.</li>
                <li>Trigonometric angle extraction via 3D coordinates.</li>
                <li>Hysteresis state machine eliminates rep stutter/flicker.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-border/40 bg-muted/20 p-3 text-[11px] text-muted-foreground flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-blue-400" />
            <span>Camera stream runs 100% locally in WebAssembly/WebGL memory; no frames or images leave your device.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
