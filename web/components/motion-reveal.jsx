export function MotionReveal({ children, className, delay = 0 }) {
  return (
    <div
      className={className}
      style={{
        animation: "reveal-up 600ms cubic-bezier(.22,1,.36,1) both",
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
