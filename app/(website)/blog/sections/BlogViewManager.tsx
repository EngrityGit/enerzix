'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { LayoutGrid, List, Columns, Search, ArrowRight, Command } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

type ViewMode = 'bento' | 'table' | 'pinterest';

export default function BlogViewManager({ posts }: { posts: any[] }) {
  const [view, setView] = useState<ViewMode>('bento');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 1. KEYBOARD SHORTCUT (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. GET UNIQUE CATEGORIES
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    posts.forEach(post => {
      post.categories?.forEach((cat: string) => cats.add(cat));
    });
    return Array.from(cats);
  }, [posts]);

  // 3. FILTER LOGIC
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.categories?.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  return (
    <section className="w-full bg-[#F8FAFC] pb-24 min-h-screen" id='blog'>
      {/* --- STICKY NAV BAR --- */}
      <div className="sticky top-[72px] md:top-[88px] z-40 w-full bg-[#F8FAFC]/95 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4">
          
          {/* Top Row: Search & View Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={18} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-200/50 border border-transparent focus:border-[#005FFF]/30 focus:bg-white h-12 pl-12 pr-16 rounded-2xl text-sm font-medium outline-none transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 text-[10px] font-bold text-slate-400">
                <Command size={10} /> K
              </div>
            </div>

            <div className="bg-slate-200/50 p-1 rounded-xl flex gap-1 self-end md:self-center">
              {[
                { id: 'bento', icon: LayoutGrid },
                { id: 'pinterest', icon: Columns },
                { id: 'table', icon: List },
              ].map((mode) => (
                <button 
                  key={mode.id}
                  onClick={() => setView(mode.id as ViewMode)}
                  className={`p-2.5 rounded-lg transition-all active:scale-90 ${
                    view === mode.id ? 'bg-white shadow-md text-[#005FFF]' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <mode.icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border
                  ${activeCategory === cat 
                    ? 'bg-[#005FFF] border-[#005FFF] text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-[#005FFF] hover:text-[#005FFF]'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-12">
        {filteredPosts.length > 0 ? (
          <div className={`transition-all duration-500
            ${view === 'bento' ? 'grid grid-cols-1 md:grid-cols-6 gap-6' : ''}
            ${view === 'pinterest' ? 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6' : ''}
            ${view === 'table' ? 'flex flex-col border-t border-slate-200/60' : ''}
          `}>
            {filteredPosts.map((post, i) => (
              <PostCard key={post._id} post={post} view={view} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-100 shadow-sm mb-6">
                <Search size={32} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-[#0A192F] uppercase tracking-tighter">No matches found</h3>
             <p className="text-slate-500 mt-2 max-w-xs">We couldn&apos;t find any articles for &quot;{searchQuery}&quot;.</p>
             <button 
               onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
               className="mt-6 text-[11px] font-black uppercase text-[#005FFF] tracking-widest border-b-2 border-[#005FFF] pb-1"
             >
                Clear all filters
             </button>
          </div>
        )}
      </div>
    </section>
  );
}

// --- POST CARD SUB-COMPONENT ---
function PostCard({ post, view, index }: { post: any; view: ViewMode; index: number }) {
  const isLarge = index % 5 === 0;
  const slug = post.slug?.current;
  const date = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  if (!slug) return null;

  if (view === 'table') {
    return (
      <Link href={`/blog/${slug}`} className="group flex flex-col sm:flex-row sm:items-center justify-between py-10 border-b border-slate-200/60 hover:bg-white sm:px-8 transition-all rounded-xl mt-2">
        <div className="flex items-center gap-8">
          <span className="hidden md:block text-[11px] font-black text-[#005FFF] opacity-20">0{index + 1}</span>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#0A192F] group-hover:text-[#005FFF] transition-colors uppercase tracking-tighter leading-none">
              {post.title}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">
              {date} &nbsp; <span className="text-[#005FFF]/30">/</span> &nbsp; {post.categories?.[0] || 'Insight'}
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-0 flex items-center gap-3 text-[#005FFF] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Read Article</span>
             <div className="w-8 h-8 rounded-full border border-[#005FFF] flex items-center justify-center">
                <ArrowRight size={14} />
             </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      href={`/blog/${slug}`}
      className={`group block relative overflow-hidden bg-white border border-slate-200/60 rounded-[32px] transition-all hover:shadow-2xl hover:shadow-[#005FFF]/5
        ${view === 'bento' ? (isLarge ? 'md:col-span-4 aspect-video md:h-[560px]' : 'md:col-span-2 aspect-square md:h-[560px]') : ''}
        ${view === 'pinterest' ? 'break-inside-avoid mb-6' : ''}
      `}
    >
      <div className={`relative w-full h-full ${view === 'pinterest' ? 'aspect-[4/5]' : ''}`}>
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(view === 'bento' && isLarge ? 1400 : 800).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
        ) : (
            <div className="absolute inset-0 bg-[#E2EDFB]" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent opacity-90" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
                    {post.categories?.[0] || 'Insight'}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#005FFF]" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">{date}</span>
            </div>
            
            <h3 className={`text-white font-black uppercase tracking-tighter leading-[0.9] mb-5 group-hover:text-[#005FFF] transition-colors
                ${isLarge && view === 'bento' ? 'text-4xl md:text-6xl' : 'text-2xl md:text-4xl'}
            `}>
                {post.title}
            </h3>
            
            <p className="text-white/60 text-sm md:text-base font-medium line-clamp-2 max-w-md leading-relaxed">
                {post.excerpt}
            </p>
        </div>
      </div>
    </Link>
  );
}