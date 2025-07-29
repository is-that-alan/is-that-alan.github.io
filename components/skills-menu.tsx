"use client"

import { useState } from "react"
import Image from "next/image"

export default function SkillsMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const skills = [
    {
      name: "Python",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/186px-Python-logo-notext.svg.png",
    },
    {
      name: "JavaScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png",
    },
    {
      name: "React",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/240px-React-icon.svg.png",
    },
    {
      name: "Node.js",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/240px-Node.js_logo.svg.png",
    },
    {
      name: "TypeScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/240px-Typescript_logo_2020.svg.png",
    },
    {
      name: "Next.js",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/240px-Nextjs-logo.svg.png",
    },
    {
      name: "Git",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/240px-Git-logo.svg.png",
    },
    {
      name: "Docker",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/240px-Docker_%28container_engine%29_logo.svg.png",
    },
    {
      name: "AWS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/240px-Amazon_Web_Services_Logo.svg.png",
    },
  ]

  return (
    <div
      className="apps relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/5/55/Google_apps_icon_2020.svg"
        alt="Apps"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="apps-menu absolute top-8 right-0 bg-white border border-gray-200 shadow-lg p-3 grid grid-cols-3 gap-3 z-10 rounded-lg w-64">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              title={skill.name}
            >
              <Image src={skill.icon || "/placeholder.svg"} alt={skill.name} width={32} height={32} className="mb-2" />
              <span className="text-xs text-gray-600 text-center leading-tight">{skill.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
