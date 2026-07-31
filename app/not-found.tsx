import Link from 'next/link';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

export default function NotFound() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC]">

      {/* Gigantic Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1
          className="text-[30vw] font-black text-[#005FFF] tracking-tighter opacity-0 animate-watermark-fade"
        >
          404
        </h1>
      </div>

      {/* Minimal SVG Ripple Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200" className="opacity-20">
          <circle
            cx="100" cy="100" r="40"
            stroke="#005FFF" strokeWidth="0.5" fill="none"
            className="animate-notfound-ripple"
          />
          <circle
            cx="100" cy="100" r="40"
            stroke="#005FFF" strokeWidth="0.5" fill="none"
            className="animate-notfound-ripple"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Minimal Header */}
        <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDuration: '0.6s' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#005FFF] bg-[#005FFF]/5 px-4 py-2 rounded-full backdrop-blur-sm border border-[#005FFF]/10">
            Current Interrupted
          </span>
        </div>

        {/* Creative Wording */}
        <h2
          className="text-6xl md:text-8xl font-black text-[#0A192F] tracking-tighter leading-[0.9] mb-6 opacity-0 animate-fade-up"
          style={{ animationDuration: '0.6s', animationDelay: '0.2s' }}
        >
          Beyond the <br />
          <span className="italic font-light text-[#005FFF]">Glacial</span> Edge.
        </h2>

        <p
          className="text-slate-500 text-lg md:text-xl font-light max-w-md leading-relaxed mb-12 opacity-0 animate-fade-up"
          style={{ animationDuration: '0.6s', animationDelay: '0.4s' }}
        >
          Even the purest streams lose their way.
          The path you are looking for has drifted into the mist.
        </p>

        {/* Original Button */}
        <div className="opacity-0 animate-fade-up" style={{ animationDuration: '0.6s', animationDelay: '0.6s' }}>
          <Link href="/">
            <LiquidButton text="Back to the Source" scrolled={true} />
          </Link>
        </div>
      </Container>

      {/* Bottom Mist */}
      <div className="absolute bottom-0 w-full h-[15vh] bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
    </section>
  );
}
