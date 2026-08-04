import { privacyData } from '@/data/privacy';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Privacy Policy | Enerzix Canada',
  description: 'Legal protocols and data protection for Enerzix (Engrity Group Inc.)',
};

export default function PrivacyPage() {
  return (
    <main className="pt-40 pb-24 bg-white">
      <Container>
        <div className="max-w-4xl">
          {/* Header with Versioning */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-[#005FFF]/10 text-[#005FFF] text-[10px] font-black rounded-full uppercase">
              v{privacyData.version}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last Updated: {privacyData.lastUpdated}
            </span>
            <span className="text-[10px] font-bold text-[#0A192F] uppercase tracking-widest border-l border-slate-200 pl-4">
              Jurisdiction: {privacyData.jurisdiction}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-[#0A192F] uppercase tracking-tighter mb-16">
            Privacy <span className="text-[#005FFF] italic font-light lowercase">Policy.</span>
          </h1>
          
          <div className="space-y-16">
            {privacyData.sections.map((section) => (
              <section key={section.id} className="border-l-2 border-slate-100 pl-8 relative">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#005FFF]" />
                
                <h2 className="text-xl font-black text-[#0A192F] uppercase mb-4 tracking-tight">
                  {section.title}
                </h2>
                
                <p className="text-slate-600 font-light leading-relaxed mb-6">
                  {section.content}
                </p>

                {section.list && (
                  <ul className="grid grid-cols-1 gap-4">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#F4F9FF] border border-[#E2EDFB] text-sm text-slate-600">
                        <span className="text-[#005FFF] font-bold">0{i + 1}</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-24 p-8 rounded-[20px] bg-[#0A192F] text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Legal Entity</p>
            <p className="text-lg font-black uppercase tracking-tighter">{privacyData.company}</p>
            <p className="text-sm font-light mt-4 opacity-80">For all privacy inquiries, please contact: <span className="text-[#005FFF] font-bold">legal@enerzix.ca</span></p>
          </div>
        </div>
      </Container>
    </main>
  );
}