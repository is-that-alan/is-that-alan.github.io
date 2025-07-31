import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export default function TopRightNav() {
  return (
    <div className="absolute top-6 right-6">
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <NavLinks />
      </div>
    </div>
  );
}