import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Gavel, GraduationCap } from "lucide-react";

const featured = [
  {
    icon: Trophy,
    accent: "#b26841",
    badge: "Champion · 2025",
    title: "AWS AI League — Hong Kong",
    org: "Amazon Web Services · AWS TechFest",
    image: "/images/aws-ai-league-champion.jpg",
    imageAlt: "Alan Wong holding the championship belt at AWS TechFest Generative AI",
    description:
      "Won first place in a live, real-time model fine-tuning competition — building and tuning a model on the spot against the clock and the field.",
    tags: ["Fine-tuning", "LLMs", "Live competition"],
  },
  {
    icon: Gavel,
    accent: "#1a73e8",
    badge: "Judging Panellist · 2024",
    title: "HKU Hack4SGD Hackathon",
    org: "The University of Hong Kong",
    image: "/images/hku-hack4sgd-judging.jpg",
    imageAlt: "Alan Wong receiving a certificate of appreciation as a Hack4SGD judging panellist",
    description:
      "Invited to the judging panel for a sustainable-development hackathon — evaluating teams on technical merit, impact, and feasibility.",
    tags: ["Judging", "AI for Good", "Mentoring"],
  },
];

const events = [
  {
    icon: GraduationCap,
    title: "Volunteer Python Tutor — Student Hubs (Bristol Hub)",
    detail: "Prepared weekly material and taught teenagers the basic concepts of coding in Python.",
    when: "Feb – Apr 2019",
  },
  {
    icon: Gavel,
    title: "Judging panellist — HKU Hack4SGD",
    detail: "Evaluated student and professional teams building sustainability-focused solutions.",
    when: "2024",
  },
  {
    icon: Trophy,
    title: "Competitor & winner — AWS AI League",
    detail: "Real-time fine-tuning showdown at AWS TechFest Hong Kong.",
    when: "2025",
  },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <Header>
        <GoogleSearchBar defaultValue="Alan Wong achievements" />
      </Header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-7 h-7 text-[#b26841]" />
          <h1 className="text-3xl md:text-4xl font-normal text-[#202124]">Achievements &amp; Recognition</h1>
        </div>
        <p className="text-[15px] text-[#5f6368] mb-8 max-w-2xl">
          Awards, judging invitations, and community events along the way.
        </p>

        {/* Featured awards */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {featured.map((f) => (
            <div
              key={f.title}
              className="relative rounded-2xl border border-[#e0e0e0] bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative h-[30rem] w-full bg-[#f1f3f4]">
                <Image
                  src={f.image}
                  alt={f.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ backgroundColor: `${f.accent}e6`, color: "#ffffff" }}
                >
                  {f.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${f.accent}1a` }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-[#202124] leading-snug">{f.title}</h2>
                    <p className="text-sm text-[#5f6368]">{f.org}</p>
                  </div>
                </div>
                <p className="text-[15px] leading-7 text-[#3c4043]">{f.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {f.tags.map((t) => (
                    <span key={t} className="px-3 py-1 bg-[#f1f3f4] text-[#3c4043] text-xs rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Events & community */}
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#5f6368] mb-4">Events &amp; Community</h2>
        <div className="relative border-l-2 border-[#e0e0e0] ml-3 space-y-6 pb-2">
          {events.map((e) => (
            <div key={e.title} className="relative pl-7">
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-2 border-[#1a73e8] flex items-center justify-center">
                <e.icon className="w-2.5 h-2.5 text-[#1a73e8]" />
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <p className="text-[15px] font-medium text-[#202124]">{e.title}</p>
                <span className="text-xs text-[#b26841] font-medium flex-shrink-0">{e.when}</span>
              </div>
              <p className="text-sm leading-6 text-[#3c4043] mt-1">{e.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#e0e0e0]">
          <Link href="/about" className="text-sm text-[#1a73e8] hover:underline">
            ← Back to about
          </Link>
        </div>
      </main>
    </div>
  );
}
