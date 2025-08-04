"use client";

import dynamic from 'next/dynamic';
import Header from "@/components/header";

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

export default function MarkdownRendererPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header showLogo={false} />
      <div className="flex-grow flex flex-col p-4">
        <Editor />
      </div>
    </div>
  );
}