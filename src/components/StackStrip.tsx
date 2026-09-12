import { STACK_ITEMS } from '../data';

export default function StackStrip() {
  return (
    <section
      aria-label="Technologies and Tooling"
      className="w-full bg-[#F7F6F3] border-t border-[#E4E1DA] py-16 sm:py-20 px-6 sm:px-8 md:px-12"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6B66]">
            CAPABILITIES // TOOLSET
          </span>
          <span className="font-mono text-xs text-[#6E6B66] uppercase tracking-[0.14em]">
            MODERN WEB &amp; CREATIVE STACK
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {STACK_ITEMS.map((item) => (
            <div
              key={item}
              className="group flex items-center justify-between px-5 py-4 rounded-[6px] border border-[#E4E1DA] bg-white/40 transition-all duration-300 hover:border-[#FF4D00] hover:-translate-y-1 hover:bg-white cursor-default select-none shadow-xs"
            >
              <span className="font-mono text-xs sm:text-sm font-medium tracking-[0.08em] text-[#111110] group-hover:text-[#FF4D00] transition-colors">
                {item}
              </span>
              <span className="text-[10px] font-mono text-[#6E6B66] opacity-0 group-hover:opacity-100 transition-opacity">
                //
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
