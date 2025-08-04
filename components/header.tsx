"use client";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
  showLogo?: boolean;
}

export default function Header({ children, className, showLogo = true }: HeaderProps) {
  return (
    <header className={`p-4 flex items-center justify-between ${className}`}>
      {/* Left Side: Mobile Nav and optional Logo */}
      <div className="flex items-center space-x-4">
        <MobileNav />
        {showLogo && (
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
        )}
      </div>

      {/* Center: Children (e.g., Search Bar) */}
      <div className="flex-1 flex justify-center px-4 md:px-8 h-10 items-center">{children}</div>

      {/* Right Side: Desktop Nav Links */}
      <div className="hidden md:block">
        <NavLinks />
      </div>
    </header>
  );
}