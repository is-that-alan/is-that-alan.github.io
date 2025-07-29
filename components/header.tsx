
import Link from "next/link";
import Image from "next/image";
import SkillsMenu from "./skills-menu";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  return (
    <header className={`p-4 flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src="/images/alanwong_dev_logo.png"
            alt="alanwong.dev"
            width={150}
            height={50}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
        {children}
      </div>
      <nav className="flex items-center space-x-4 text-sm text-[#5f6368]">
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <SkillsMenu />
        <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all">
          <Image
            src="/images/digital_alan.jpg"
            alt="Alan Wong"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </nav>
    </header>
  );
}
