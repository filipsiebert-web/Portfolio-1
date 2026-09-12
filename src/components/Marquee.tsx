export default function Marquee() {
  const content = "FULL-STACK DEVELOPMENT ✺ AI WORKSHOPS ✺ CREATIVE CODING ✺ 3D WEB EXPERIENCES ✺ ";

  return (
    <div
      aria-label="Disciplinary overview marquee"
      className="w-full border-y border-[#E4E1DA] bg-[#F7F6F3] py-4 sm:py-5 overflow-hidden select-none"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="font-serif italic text-[20px] sm:text-[28px] text-[#111110] tracking-wide pr-8">
          {content}
        </span>
        <span className="font-serif italic text-[20px] sm:text-[28px] text-[#111110] tracking-wide pr-8">
          {content}
        </span>
        <span className="font-serif italic text-[20px] sm:text-[28px] text-[#111110] tracking-wide pr-8">
          {content}
        </span>
        <span className="font-serif italic text-[20px] sm:text-[28px] text-[#111110] tracking-wide pr-8">
          {content}
        </span>
      </div>
    </div>
  );
}
