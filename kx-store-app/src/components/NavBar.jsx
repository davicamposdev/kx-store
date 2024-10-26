import Logo from "./Logo";
import { House, LogOut, ShoppingCart } from "lucide-react";
import KxNavLink from "./KxNavLink";

function NavBar() {
  return (
    <nav
      className="
    p-2 bg-kx-orange w-screen flex justify-between items-center text-slate-200 px-4"
    >
      <Logo heigh={"h-12"} />
      <ul className="flex w-full justify-evenly">
        <li>
          <KxNavLink icon={<House />} to={"/home"} text={"Home"} />
        </li>
        <li>
          <KxNavLink icon={<ShoppingCart />} to={"/sales"} text={"Sales"} />
        </li>
      </ul>
      <KxNavLink icon={<LogOut />} to={"/"} text={"Logout"} />
    </nav>
  );
}

export default NavBar;
