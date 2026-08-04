'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const POSTS = [
  {
    id: 1,
    category: 'Science',
    title: 'The Role of Ozonation in Water Purity',
    excerpt: 'Why we use Ozonation to ensure every Enerzix bottle remains sterile without chemical aftertaste.',
    image: '/products/enerzix_hero.png', // Replace with actual blog images
    date: 'Oct 12, 2023'
  },
  {
    id: 2,
    category: 'Logistics',
    title: 'Delivering to Remote Construction Sites',
    excerpt: 'How our logistics network handles weekly replenishments for heavy industry projects across BC and AB.',
    image: '/products/enerzix_500ml.webp',
    date: 'Sep 28, 2023'
  },
  {
    id: 3,
    category: 'Sustainability',
    title: 'The Lifecycle of a PET 1 Bottle',
    excerpt: 'Our commitment to 100% recyclability and how Enerzix is reducing plastic waste in the province.',
    image: '/products/enerzix_hero.png',
    date: 'Sep 15, 2023'
  }
];

export default function BlogGrid() {
  return (
    <section id="articles" className="py-24 bg-[#F8FAFC]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`} 
              className="group flex flex-col bg-[#F8FAFC] rounded-[32px] overflow-hidden border border-slate-100 transition-all hover:shadow-2xl hover:shadow-blue-500/5 active:scale-[0.98]"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/50">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#005FFF]">
                     {post.category}
                   </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {post.date}
                </span>
                <h3 className="text-2xl font-black text-[#0A192F] uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#005FFF] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-8 flex items-center gap-2">
                   <span className="text-[11px] font-black uppercase text-[#005FFF] tracking-tighter">Read Full Story</span>
                   <svg className="w-4 h-4 text-[#005FFF] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}