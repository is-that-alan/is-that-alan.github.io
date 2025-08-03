import { NavLinks } from "./nav-links";

export default function TopRightNav() {
  return (
    <div className="hidden md:block absolute top-4 right-4">
      <NavLinks />
    </div>
  );
}
