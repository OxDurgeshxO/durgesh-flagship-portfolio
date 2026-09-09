export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-60" />

      {/* Floating ambient glow orbs */}
      <div className="absolute -top-40 left-[10%] h-[32rem] w-[32rem] rounded-full bg-[#6c63ff]/20 blur-[130px] animate-float" />
      <div
        className="absolute top-[35%] right-[5%] h-[28rem] w-[28rem] rounded-full bg-[#00d4ff]/15 blur-[130px] animate-float"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-[#4f46e5]/15 blur-[140px] animate-float"
        style={{ animationDelay: '-1.5s' }}
      />

      {/* Radial vignette to deepen edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,transparent_25%,#0a0a0f_92%)]" />
    </div>
  );
}
