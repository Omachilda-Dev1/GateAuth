export function AuthDivider() {
  return (
    <div className="relative flex items-center gap-3 my-5">
      <div className="flex-1 h-px" style={{ background: "#E4ECEC" }} />
      <span className="text-xs font-medium uppercase tracking-widest px-1" style={{ color: "#7A9E9C" }}>
        or
      </span>
      <div className="flex-1 h-px" style={{ background: "#E4ECEC" }} />
    </div>
  );
}
