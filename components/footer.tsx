
import Link from 'next/link';
import { useState } from 'react';
import InfoCard from './info-card';

export default function Footer() {
  const [showInfoCard, setShowInfoCard] = useState(false);

  return (
    <>
      <footer className="w-full shrink-0 bg-[#f2f2f2] text-[14px] text-[#70757a]">
        <div className="border-b border-[#dadce0] px-[30px] py-[15px] text-[15px]">
          <p>Hong Kong</p>
        </div>
        <div className="flex min-h-[46px] flex-col items-center justify-between px-5 md:flex-row md:items-stretch">
          <div className="flex">
            <button onClick={() => setShowInfoCard(true)} className="block whitespace-nowrap px-[15px] py-[15px] hover:underline">How it works</button>
          </div>
          <div className="flex">
            <Link href="#" className="block whitespace-nowrap px-[15px] py-[15px] hover:underline">Privacy</Link>
            <Link href="#" className="block whitespace-nowrap px-[15px] py-[15px] hover:underline">Terms</Link>
            <Link href="#" className="block whitespace-nowrap px-[15px] py-[15px] hover:underline">Settings</Link>
          </div>
        </div>
      </footer>
      {showInfoCard && <InfoCard onClose={() => setShowInfoCard(false)} />}
    </>
  );
}
