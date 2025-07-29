import Link from "next/link"
import Image from "next/image"

export default function LogoHeader() {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/alanwong_dev_logo.png"
          alt="alanwong.dev"
          width={150}
          height={50}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>
    </div>
  )
}
