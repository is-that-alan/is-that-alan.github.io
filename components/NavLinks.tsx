import Link from "next/link";
import Image from "next/image";

export function NavLinks() {
  return (
    <nav className="flex items-center space-x-6 text-xl text-[#3c4043]">
      <Link href="/projects" className="hover:underline">
        Projects
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
      <Image
        src="/images/waffle_icon.png"
        alt="Waffle icon"
        width={28}
        height={28}
        className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
      />
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