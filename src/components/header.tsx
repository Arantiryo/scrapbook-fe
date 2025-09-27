import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link>
    </div>
  );
}

export default Header;
