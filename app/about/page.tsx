import AiOverviewPanel from "@/components/ai-overview-panel";
import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award } from "lucide-react";
import { experiences } from "@/lib/experience";

const bio =
  "Hi, I’m Alan — a data scientist with around five years leading full-cycle AI and quantitative projects across investment analytics, QIS risk, and agentic AI. Right now I work closely with our Group CEO on firm-wide AI for our Biotech VC and family-office arms — building autonomous learning loops and an autonomous AI investment-agents team, and shipping LLM-powered tools that influence how deals get screened and pursued. Earlier I built the cross-asset risk aggregation engine at Premialab, serving leading global investment banks and institutional clients managing US$20tn AUM. I love rapid prototyping, bridging technical and non-technical teams, and chasing the next genuinely useful tool. If you like coffee-fuelled brainstorms and clever code, let’s connect!";

const skills = [
  "Python",
  "SQL",
  "TypeScript",
  "LLMs",
  "RAG",
  "Agentic AI",
  "LangChain",
  "PyTorch",
  "FastAPI",
  "AWS",
  "Docker",
];

const education = [
  { school: "Georgia Institute of Technology", detail: "MSc Analytics · GPA 4.0 (In Progress)" },
  { school: "University of Bath", detail: "MSc Computer Science · Distinction (2020)" },
  { school: "University of Bristol", detail: "BSc Economics · Upper Second (2019)" },
];

const achievements = [
  { icon: Trophy, title: "Champion — AWS AI League Hong Kong", detail: "Real-time fine-tuning · 2025" },
  { icon: Award, title: "Judging Panellist — HKU Hack4SGD", detail: "Hackathon · 2024" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header>
        <GoogleSearchBar defaultValue="Alan Wong" />
      </Header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Search results */}
          <div className="flex-1 max-w-2xl">
            <div className="mb-6">
              <AiOverviewPanel bio={bio} />
            </div>
            <div className="text-sm text-gray-500 mb-4">About {experiences.length} results (0.25 seconds)</div>

            {/* Experience as search results */}
            <div className="space-y-6">
              {experiences.map((role) => (
                <div key={role.slug}>
                  <div className="text-sm text-[#0b8043] mb-0.5">{role.displayUrl}</div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1">
                    <Link href={`/experience/${role.slug}`}>
                      {role.company} — {role.role}
                    </Link>
                  </h3>
                  <div className="text-sm text-gray-500 mb-1.5">{role.dateRange}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{role.summary}</p>
                </div>
              ))}

              {/* Achievements result */}
              <div>
                <div className="text-sm text-[#0b8043] mb-0.5">alanwong.dev › achievements</div>
                <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1">
                  <Link href="/achievements">Achievements &amp; Recognition — Alan Wong</Link>
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  AWS AI League Hong Kong Champion (2025), HKU Hack4SGD judging panellist (2024), and a stack of
                  AI / cloud certifications.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Knowledge panel */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              <div className="text-center mb-4">
                <Image
                  src="/images/alan.jpg"
                  alt="Alan Wong"
                  width={160}
                  height={200}
                  className="rounded-lg mx-auto mb-3"
                />
                <h2 className="text-xl font-normal text-gray-900">Alan Wong</h2>
                <p className="text-sm text-gray-600">Senior Associate, Data Science · Nan Fung</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#1a73e8]" />
                  Highlights
                </h3>
                <div className="space-y-2">
                  {achievements.map((a) => (
                    <div key={a.title} className="flex items-start gap-2">
                      <a.icon className="w-4 h-4 text-[#b26841] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 leading-snug">{a.title}</p>
                        <p className="text-xs text-gray-500">{a.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/achievements"
                  className="inline-block mt-3 text-sm text-[#1a73e8] hover:underline"
                >
                  View all achievements →
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Education</h3>
                <div className="space-y-2 text-sm">
                  {education.map((e) => (
                    <div key={e.school}>
                      <p className="font-semibold">{e.school}</p>
                      <p className="text-gray-600">{e.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
