export default function Loading() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center gap-6 overflow-hidden">
      <div className="relative w-32 h-24 flex items-center justify-center">
        {/* Motion lines trailing behind the runner */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <div className="motion-line" style={{ animationDelay: "0s", width: "24px" }} />
          <div className="motion-line" style={{ animationDelay: "0.15s", width: "16px" }} />
          <div className="motion-line" style={{ animationDelay: "0.3s", width: "20px" }} />
        </div>

        {/* Runner figure */}
        <div className="runner-bounce relative z-10">
          <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
            {/* Head + torso — stay constant, just bounce with the wrapper */}
            <circle cx="24" cy="8" r="5" fill="#a83300" />
            <path d="M23 13 L18 28" stroke="#a83300" strokeWidth="4" strokeLinecap="round" />

            {/* Frame A: right leg forward + right arm back, left leg back + left arm forward */}
            <g className="frame-a">
              <path d="M20 20 L10 16" stroke="#a83300" strokeWidth="3" strokeLinecap="round" />
              <path d="M22 19 L32 23 L30 31" stroke="#a83300" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M19 27 L8 32 L5 42" stroke="#a83300" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M19 27 L28 35 L27 47" stroke="#a83300" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>

            {/* Frame B: opposite pose */}
            <g className="frame-b">
              <path d="M22 19 L32 23" stroke="#a83300" strokeWidth="3" strokeLinecap="round" />
              <path d="M20 20 L10 16 L9 24" stroke="#a83300" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M19 27 L29 32 L31 42" stroke="#a83300" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M19 27 L9 35 L10 47" stroke="#a83300" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-surface-container-low overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{
            animation: "loading-bar 1.5s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>

      <p
        className="text-xs text-outline tracking-[0.3em]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        LABATTS MOVEMENT
      </p>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @keyframes runner-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .runner-bounce {
          animation: runner-bounce 0.4s ease-in-out infinite;
        }
        @keyframes frame-a-cycle {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes frame-b-cycle {
          0%, 45% { opacity: 0; }
          50%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }
        .frame-a {
          animation: frame-a-cycle 0.4s steps(1) infinite;
        }
        .frame-b {
          animation: frame-b-cycle 0.4s steps(1) infinite;
        }
        @keyframes motion-line-fade {
          0% { opacity: 0.6; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-16px); }
        }
        .motion-line {
          height: 2px;
          background: var(--color-outline-variant);
          border-radius: 999px;
          animation: motion-line-fade 0.6s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
