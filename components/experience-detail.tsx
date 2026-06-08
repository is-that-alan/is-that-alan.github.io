import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Calendar, ChevronRight, Check } from "lucide-react";
import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import { experiences, type ExperienceRole } from "@/lib/experience";

export default function ExperienceDetail({ role }: { role: ExperienceRole }) {
  const others = experiences.filter((e) => e.slug !== role.slug);

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <Header>
        <GoogleSearchBar defaultValue={role.company} />
      </Header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb / back */}
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-sm text-[#5f6368] hover:text-[#1a73e8] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All experience
        </Link>

        {/* Title block */}
        <div className="mb-2 text-sm text-[#5f6368]">
          <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-[#0b8043] hover:underline">
            {role.displayUrl}
          </a>
        </div>
        <h1 className="text-3xl md:text-4xl font-normal text-[#1a0dab] mb-3">{role.company}</h1>
        <p className="text-lg text-[#202124] font-medium">{role.role}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-[#5f6368]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {role.dateRange}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {role.location}
          </span>
          <a
            href={role.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#1a73e8] hover:underline"
          >
            Visit site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="mt-5 text-[15px] leading-7 text-[#3c4043] max-w-3xl">{role.summary}</p>

        {/* Impact highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {role.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-xl border border-[#e0e0e0] bg-[#f8fbff] p-4 hover:shadow-sm transition-shadow"
            >
              <div className="text-xl md:text-2xl font-semibold text-[#1a73e8] leading-tight">{h.metric}</div>
              <div className="text-xs text-[#5f6368] mt-1.5 leading-snug">{h.label}</div>
            </div>
          ))}
        </div>

        {/* Bullets */}
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#5f6368] mt-10 mb-4">
          What I worked on
        </h2>
        <ul className="space-y-3.5">
          {role.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#e8f0fe] flex items-center justify-center">
                <Check className="w-3 h-3 text-[#1a73e8]" />
              </span>
              <span className="text-[15px] leading-7 text-[#3c4043]">{b}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {role.tags.map((t) => (
            <span key={t} className="px-3 py-1 bg-[#f1f3f4] text-[#3c4043] text-xs rounded-full">
              {t}
            </span>
          ))}
        </div>

        {/* Other roles */}
        <div className="mt-12 pt-8 border-t border-[#e0e0e0]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#5f6368] mb-4">
            More experience
          </h2>
          <div className="space-y-1">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/experience/${o.slug}`}
                className="group flex items-center justify-between rounded-lg px-3 py-3 hover:bg-[#f8f9fa] transition-colors"
              >
                <div>
                  <div className="text-[#1a0dab] group-hover:underline">{o.company}</div>
                  <div className="text-sm text-[#5f6368]">
                    {o.role} · {o.dateRange}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#5f6368] flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
