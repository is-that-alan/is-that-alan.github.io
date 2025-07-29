"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import LogoHeader from "@/components/logo-header"
import Navigation from "@/components/navigation"

import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import AiOverviewPanel from "@/components/ai-overview-panel";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="min-h-screen bg-white">
      <Header>
        <GoogleSearchBar defaultValue={query} />
      </Header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <AiOverviewPanel />
      </div>
    </div>
  );
}
