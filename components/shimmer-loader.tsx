
export default function ShimmerLoader() {
  const shimmerKeyframes = `
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  `;

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-2xl bg-white">
        {/* Circle */}
        <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        {/* Lines */}
        <div className="flex flex-1 flex-col gap-2.5 pt-1">
          <div className="relative h-3 w-3/5 overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
          <div className="relative h-3 w-11/12 overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
          <div className="relative h-3 w-4/6 overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}
