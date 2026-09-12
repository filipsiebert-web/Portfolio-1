import { LAB_EXPERIMENTS } from '../data';

export default function Lab() {
  return (
    <section
      id="lab"
      aria-label="Creative Experiments"
      className="w-full bg-[#F7F6F3] border-t border-[#E4E1DA] py-24 sm:py-32 px-6 sm:px-8 md:px-12"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-16 pb-6 border-b border-[#E4E1DA]">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF4D00]">
              03 — R&amp;D // CREATIVE CODING
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-[#111110]">
              The Lab
            </h2>
          </div>
          <span className="font-mono text-xs text-[#6E6B66] uppercase tracking-[0.14em] mt-4 sm:mt-0">
            PURE CSS GRAPHICS · ZERO EXTERNAL ASSETS
          </span>
        </div>

        {/* 3 Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Pulsing Gradient Orb */}
          <div className="group flex flex-col rounded-[6px] border border-[#E4E1DA] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4D00] hover:shadow-lg">
            {/* Visual Container */}
            <div className="relative aspect-[16/11] w-full rounded-[4px] overflow-hidden bg-[#111110] border border-[#E4E1DA]/40 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.15)_0,transparent_70%)]" />
              {/* Pulsing Gradient Orb */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF4D00] via-[#FF8A00] to-[#E4E1DA] animate-orb" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-36 h-36 rounded-full border border-white/10" />
                <div className="w-48 h-48 rounded-full border border-white/5" />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66] mb-2">
              <span>{LAB_EXPERIMENTS[0].number}</span>
              <span className="text-[#FF4D00]">INTERACTIVE ORB</span>
            </div>
            <h3 className="font-mono text-base font-semibold text-[#111110] mb-2">
              {LAB_EXPERIMENTS[0].title}
            </h3>
            <p className="font-sans text-sm text-[#6E6B66] leading-relaxed">
              {LAB_EXPERIMENTS[0].description}
            </p>
          </div>

          {/* Card 2: Typing Terminal Line Loop */}
          <div className="group flex flex-col rounded-[6px] border border-[#E4E1DA] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4D00] hover:shadow-lg">
            {/* Visual Container */}
            <div className="relative aspect-[16/11] w-full rounded-[4px] overflow-hidden bg-[#111110] border border-[#E4E1DA]/40 p-5 flex flex-col justify-between font-mono text-[11px] mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/50 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span>NODE_01 — V8</span>
              </div>

              <div className="space-y-2 my-auto text-white/80">
                <p className="text-white/40">&gt; import &#123; gemini &#125; from &apos;@genai&apos;;</p>
                <p className="text-[#FF4D00]">&gt; synthesizeContext(prompt);</p>
                <p className="text-white/70 flex items-center">
                  <span>&gt; status: 200 OK — latency 48ms</span>
                  <span className="inline-block w-2 h-3.5 bg-[#FF4D00] ml-1.5 animate-blink" />
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[9px] text-white/40 uppercase">
                <span>MEM: 34.2MB</span>
                <span className="text-[#FF4D00]">ONLINE</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66] mb-2">
              <span>{LAB_EXPERIMENTS[1].number}</span>
              <span className="text-[#FF4D00]">REACTIVE CLI</span>
            </div>
            <h3 className="font-mono text-base font-semibold text-[#111110] mb-2">
              {LAB_EXPERIMENTS[1].title}
            </h3>
            <p className="font-sans text-sm text-[#6E6B66] leading-relaxed">
              {LAB_EXPERIMENTS[1].description}
            </p>
          </div>

          {/* Card 3: Rotating Wireframe Cube */}
          <div className="group flex flex-col rounded-[6px] border border-[#E4E1DA] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4D00] hover:shadow-lg">
            {/* Visual Container */}
            <div className="relative aspect-[16/11] w-full rounded-[4px] overflow-hidden bg-[#111110] border border-[#E4E1DA]/40 flex items-center justify-center cube-wrap mb-6">
              <div className="cube">
                <div className="cube-face face-front" />
                <div className="cube-face face-back" />
                <div className="cube-face face-right" />
                <div className="cube-face face-left" />
                <div className="cube-face face-top" />
                <div className="cube-face face-bottom" />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66] mb-2">
              <span>{LAB_EXPERIMENTS[2].number}</span>
              <span className="text-[#FF4D00]">3D MATRIX</span>
            </div>
            <h3 className="font-mono text-base font-semibold text-[#111110] mb-2">
              {LAB_EXPERIMENTS[2].title}
            </h3>
            <p className="font-sans text-sm text-[#6E6B66] leading-relaxed">
              {LAB_EXPERIMENTS[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
