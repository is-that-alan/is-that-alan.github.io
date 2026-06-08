"use client";

import React, { useState } from "react";
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
  Trophy,
  Bot,
  Gamepad2,
  Braces,
  KeyRound,
  Timer,
  FileCode,
} from "lucide-react";

const primaryMenuItems = [
  { href: "/about", icon: User, text: "About" },
  { href: "/projects", icon: Folder, text: "Projects" },
  { href: "/achievements", icon: Trophy, text: "Achievements" },
  { href: "/contact", icon: Mail, text: "Contact" },
  { href: "https://www.linkedin.com/in/alanwth/", icon: Linkedin, text: "LinkedIn" },
  { href: "https://github.com/is-that-alan", icon: Github, text: "GitHub" },
  { href: "/resume.pdf", icon: FileText, text: "Résumé" },
  { href: "/projects", icon: Bot, text: "AI Agents" },
  { href: "/projects", icon: Gamepad2, text: "RL Playground" },
];

const devMenuItems = [
  { href: "/tools/json-beautifier", icon: Braces, text: "JSON Beautifier" },
  { href: "/tools/password-generator", icon: KeyRound, text: "Password Gen" },
  { href: "/tools/timer", icon: Timer, text: "Timer" },
  { href: "/tools/markdown-renderer", icon: FileCode, text: "Markdown" },
];

export function NavLinks() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="flex items-center space-x-6 text-xl text-[#3c4043]">
      <Link href="/projects" className="hover:underline">
        Projects
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/achievements" className="hover:underline">
        Achievements
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
      <Popover onOpenChange={(open) => !open && setIsExpanded(false)}>
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
            {primaryMenuItems.map((item) => (
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
            {isExpanded && devMenuItems.map((item) => (
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
            {!isExpanded && (
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => setIsExpanded(true)}
              >
                More from Alan
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
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
  );
}