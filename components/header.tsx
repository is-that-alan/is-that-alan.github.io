"use client";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
  mobileNav?: ReactNode;
}

export default function Header({ children, className, mobileNav }: HeaderProps) {
  return (
    <header
      className={`p-4 flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="md:hidden">
          {mobileNav || <MobileNav />}
        </div>
        <div className="hidden md:block">
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
      </div>

      <div className="flex-1 flex justify-center px-4 md:px-8">{children}</div>

      <div className="hidden md:block">
        <NavLinks />
      </div>
    </header>
  );
}