import { useState, useEffect } from 'react';
import { FlaskConical } from 'lucide-react';

export default function ShimmerLoader() {
  const [phase, setPhase] = useState('searching');
  const [statusText, setStatusText] = useState('Searching...');
  const [animation, setAnimation] = useState('shimmer_1.5s_infinite');
  const statuses = ['Generating...'];

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    if (hasLoadedBefore) {
      setAnimation('shimmer-fast_0.15s_infinite');
    } else {
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }

    const phaseTimer = setTimeout(() => {
      setPhase('generating');
      setStatusText(statuses[0]);
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % statuses.length;
        setStatusText(statuses[index]);
      }, 500);
      return () => clearInterval(interval);
    }, 250);

    return () => clearTimeout(phaseTimer);
  }, []);

  const keyframes = `
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div className="flex flex-col gap-4 p-6 border border-[#e0e0e0] rounded-[12px] bg-white">
        <div className="flex items-center">
          <FlaskConical className="w-5 h-5 mr-2 text-[#1a73e8]" />
          <span className="text-sm font-semibold text-[#202124]">{statusText}</span>
        </div>
        {phase === 'searching' ? (
          <div className="h-32 bg-white rounded-[12px]"></div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <div className="relative h-6 w-4/5 overflow-hidden rounded-[8px] bg-[#e8f0fe]">
                <div className={`absolute inset-0 -translate-x-full animate-[${animation}] bg-gradient-to-r from-transparent via-white/60 to-transparent`}></div>
              </div>
              <div className="relative h-6 w-full overflow-hidden rounded-[8px] bg-[#e8f0fe]">
                <div className={`absolute inset-0 -translate-x-full animate-[${animation}] bg-gradient-to-r from-transparent via-white/60 to-transparent`}></div>
              </div>
              <div className="relative h-6 w-5/6 overflow-hidden rounded-[8px] bg-[#e8f0fe]">
                <div className={`absolute inset-0 -translate-x-full animate-[${animation}] bg-gradient-to-r from-transparent via-white/60 to-transparent`}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative h-6 w-full overflow-hidden rounded-[8px] bg-[#e8f0fe]">
                <div className={`absolute inset-0 -translate-x-full animate-[${animation}] bg-gradient-to-r from-transparent via-white/60 to-transparent`}></div>
              </div>
              <div className="relative h-6 w-11/12 overflow-hidden rounded-[8px] bg-[#e8f0fe]">
                <div className={`absolute inset-0 -translate-x-full animate-[${animation}] bg-gradient-to-r from-transparent via-white/60 to-transparent`}></div>
              </div>
              <div className="relative h-6 w-4/6 overflow-hidden rounded-[8px] bg-[#e8f0fe]">
                <div className={`absolute inset-0 -translate-x-full animate-[${animation}] bg-gradient-to-r from-transparent via-white/60 to-transparent`}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}