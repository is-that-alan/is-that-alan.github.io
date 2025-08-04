"use client";

import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  User,
  Folder,
  Mail,
  Linkedin,
  Github,
  FileText,
  LayoutDashboard,
  Bot,
  Gamepad2,
} from "lucide-react";

const menuItems = [
  { href: "/about", icon: User, text: "About" },
  { href: "/projects", icon: Folder, text: "Projects" },
  { href: "/contact", icon: Mail, text: "Contact" },
  { href: "https://www.linkedin.com/in/alanwth/", icon: Linkedin, text: "LinkedIn" },
  { href: "https://github.com/is-that-alan", icon: Github, text: "GitHub" },
  { href: "/resume.pdf", icon: FileText, text: "Résumé" },
  { href: "/projects", icon: LayoutDashboard, text: "Dashboards" },
  { href: "/projects", icon: Bot, text: "AI Agents" },
  { href: "/projects", icon: Gamepad2, text: "RL Playground" },
];

export function NavLinks() {
  return (
    <nav className="flex items-center space-x-6 text-lg text-[#3c4043]">
      <Link href="/projects" className="hover:underline">
        Projects
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
      <Popover>
        <PopoverTrigger asChild>
          <button className="opacity-60 hover:opacity-100 transition-opacity">
            <Image
              src="/images/waffle_icon.png"
              alt="Waffle icon"
              width={22}
              height={22}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-center"
              >
                <item.icon className="h-8 w-8 mb-2 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">{item.text}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="#" className="inline-block px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100">
              More from Alan
            </Link>
          </div>
        </PopoverContent>
      </Popover>
      <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all">
        <Image
          src="/images/digital_alan.jpg"
          alt="Alan Wong"
          width={28}
          height={28}
          className="w-full h-full object-cover"
        />
      </div>
    </nav>
  );
}