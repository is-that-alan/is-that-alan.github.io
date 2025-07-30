// components/Header.tsx
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./NavLinks";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  return (
    <header className={`p-4 flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-4">
        <MobileNav />
        <Link href="/">
          <Image
            src="/images/alanwong_dev_logo.png"
            alt="alanwong.dev"
            width={150}
            height={50}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
      <div className="flex-1 flex justify-center px-8">{children}</div>
      <div className="hidden md:block">
        <NavLinks />
      </div>
    </header>
  );
}