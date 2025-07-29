import Link from "next/link"
import Image from "next/image"
import SkillsMenu from "./skills-menu"

export default function Navigation() {
  return (
    <div className="absolute top-6 right-6 flex items-center space-x-4 text-sm text-[#5f6368]">
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
    </div>
  )
}
