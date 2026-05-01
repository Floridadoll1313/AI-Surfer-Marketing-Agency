export default function Logo({ size = 48 }) {
  return (
    <img
      src="/logo.png"
      alt="Ocean Tide Drop Logo"
      style={{ height: size, width: size }}
      className="drop-shadow-[0_0_12px_#00eaff]"
    />
  );
}
