
import Link from 'next/link';
import { useState } from 'react';
import InfoCard from './info-card';

export default function Footer() {
  const [showInfoCard, setShowInfoCard] = useState(false);

  return (
    <>
      <footer className="absolute bottom-0 w-full bg-[#f2f2f2] text-xl text-[#70757a]">
        <div className="px-8 py-4 border-b border-[#dadce0]">
          <p>Hong Kong</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-4 space-y-4 md:space-y-0">
          <div className="flex space-x-8">
            <button onClick={() => setShowInfoCard(true)} className="hover:underline">How it works</button>
          </div>
          <div className="flex space-x-8">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Settings</Link>
          </div>
        </div>
      </footer>
      {showInfoCard && <InfoCard onClose={() => setShowInfoCard(false)} />}
    </>
  );
}
