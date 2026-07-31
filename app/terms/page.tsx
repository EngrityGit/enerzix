import Container from '@/components/ui/Container';
import { termsData } from '@/data/terms';

export const metadata = {
  title: 'Terms of Service | Enerzix Canada',
  description: 'Operational protocols and binding agreement for Enerzix (Engrity Group Inc.)',
};

export default function TermsPage() {
  return (
    <main className="pt-40 pb-24 bg-white">
      <Container>
        <div className="max-w-4xl">
          {/* Header with Versioning */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-[#005FFF]/10 text-[#005FFF] text-[10px] font-black rounded-full uppercase">
              v{termsData.version}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last Updated: {termsData.lastUpdated}
            </span>
            <span className="text-[10px] font-bold text-[#0A192F] uppercase tracking-widest border-l border-slate-200 pl-4">
              Law: {termsData.jurisdiction}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-[#0A192F] uppercase tracking-tighter mb-16">
            Terms of <span className="text-[#005FFF] italic font-light lowercase">Service.</span>
          </h1>
          
          <div className="space-y-16">
            {termsData.sections.map((section) => (
              <section key={section.id} className="border-l-2 border-slate-100 pl-8 relative">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#005FFF]" />
                
                <h2 className="text-xl font-black text-[#0A192F] uppercase mb-4 tracking-tight">
                  {section.title}
                </h2>
                
                <p className="text-slate-600 font-light leading-relaxed mb-6">
                  {section.content}
                </p>

                {section.list && (
                  <ul className="grid grid-cols-1 gap-3">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#005FFF] mt-2 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-slate-100 text-center md:text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              Engrity Group Inc. // Official Protocol Document
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}