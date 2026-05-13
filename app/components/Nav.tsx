
`tsx
import { Link } from "react-router";

export default function Nav() {
  return (
    <nav className="w-full p-4 flex justify-center gap-6 text-lg font-semibold">
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/mascot">Mascot</Link>
    </nav>
  );
}
`