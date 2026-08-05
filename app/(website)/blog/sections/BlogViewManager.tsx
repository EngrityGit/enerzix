'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { LayoutGrid, List, Columns, Search, ArrowUpRight, Megaphone, Clock, Calendar, Command } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

type ViewMode = 'bento' | 'card' | 'table';

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

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    posts.forEach(post => post.categories?.forEach((cat: string) => cats.add(cat)));
    return Array.from(cats);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.categories?.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  return (
    <section className="w-full bg-[#F4F7FA] py-24 min-h-screen" id='blog'>
      {/* --- PREMIUM NAVIGATION --- */}
      <div className="sticky top-0 z-50 w-full bg-[#F4F7FA]/70 border-b border-slate-200/50">
        <div className="max-w-[1500px] mx-auto px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Search */}
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

            {/* View Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-[20px] self-start lg:self-center">
              {[
                
                { id: 'card', icon: Columns, label: 'Grid' },
                { id: 'bento', icon: LayoutGrid, label: 'Bento' },
                { id: 'table', icon: List, label: 'List' },
              ].map((mode) => (
                <button 
                  key={mode.id}
                  onClick={() => setView(mode.id as ViewMode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-sm font-bold transition-all ${
                    view === mode.id ? 'bg-white shadow-lg text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <mode.icon size={18} />
                  <span className="hidden md:inline">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all
                  ${activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                    : 'bg-white text-slate-500 hover:border-slate-300 border border-slate-200'
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
      <div className="max-w-[1500px] mx-auto px-8 mt-16">
        <div className={`
          ${view === 'bento' ? 'grid grid-cols-1 md:grid-cols-6 gap-6' : ''}
          ${view === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10' : ''}
          ${view === 'table' ? 'flex flex-col gap-6' : ''}
        `}>
          {filteredPosts.map((post, i) => (
            <PostCard key={post._id} post={post} view={view} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCard({ post, view, index }: { post: any; view: ViewMode; index: number }) {
  const slug = post.slug?.current || post.slug;
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

  // --- BENTO GRID SPAN LOGIC ---
  const getBentoClass = (i: number) => {
    const patterns = [
      'md:col-span-4 md:row-span-2 h-[650px]', // Large Feature
      'md:col-span-2 md:row-span-1 h-[312px]', // Square Small
      'md:col-span-2 md:row-span-1 h-[312px]', // Square Small
      'md:col-span-3 md:row-span-1 h-[400px]', // Medium Wide
      'md:col-span-3 md:row-span-1 h-[400px]', // Medium Wide
    ];
    return patterns[i % patterns.length];
  };

  if (view === 'table') {
    return (
      <Link href={`/blog/${slug}`} className="group flex flex-col md:flex-row items-center gap-8 p-5 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
        <div className="relative w-full md:w-48 h-48 md:h-32 shrink-0 overflow-hidden rounded-[1.5rem] bg-slate-100">
           {post.coverImage && <Image src={urlFor(post.coverImage).width(400).url()} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{post.categories?.[0] || 'Insight'}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h3>
        </div>

        <div className="shrink-0 pb-4 md:pb-0 pr-0 md:pr-4">
           <div className="bg-slate-900 text-black group-hover:text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 group-hover:bg-blue-600 transition-all shadow-lg">
              Read Journal <ArrowUpRight size={18} />
           </div>
        </div>
      </Link>
    );
  }

  if (view === 'card') {
    return (
      <Link href={`/blog/${slug}`} className="group flex flex-col bg-white rounded-xl p-5 transition-all">
        <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden mb-8 shadow-inner">
          {post.coverImage && <Image src={urlFor(post.coverImage).width(800).url()} alt="" fill className="object-cover" />}
          <div className="absolute top-4 left-4">
             <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-slate-900 shadow-sm">
                {post.categories?.[0]}
             </div>
          </div>
        </div>
        <div className="px-4 pb-4">
           <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <div className="flex items-center gap-1.5"><Calendar size={12} /> {date}</div>
              <div className="flex items-center gap-1.5"><Clock size={12} /> 6 min read</div>
           </div>
           <h3 className="text-3xl font-bold text-slate-900 leading-[1.1] mb-6 group-hover:text-blue-600 transition-colors">{post.title}</h3>
           <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <span className="text-sm font-bold text-slate-400">By Journal Team</span>
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <ArrowUpRight size={20} />
              </div>
           </div>
        </div>
      </Link>
    );
  }

  // --- BENTO VIEW ---
  return (
    <Link 
      href={`/blog/${slug}`}
      className={`group relative overflow-hidden rounded-xl  ${getBentoClass(index)}`}
    >
      {post.coverImage && (
        <Image src={urlFor(post.coverImage).width(1200).url()} alt="" fill className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Floating Meta Badges */}
      <div className="absolute top-6 left-6 right-6 flex justify-between">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
           <Megaphone size={14} className="text-blue-400" />
           <span className="text-[10px] font-black uppercase tracking-wider">The Journal</span>
        </div>
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
           <span className="text-[10px] font-bold uppercase opacity-80">{post.categories?.[0]}</span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
        <h3 className={`font-bold text-white leading-[1.1] mb-8 transition-all group-hover:-translate-y-2
            ${index % 5 === 0 ? 'text-4xl md:text-5xl max-w-2xl' : 'text-2xl md:text-3xl'}
        `}>
          {post.title}
        </h3>
        
        {/* THE CTA FROM REFERENCE */}
        <div className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-[20px] font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
            Read Journal
            <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ArrowUpRight size={14} />
            </div>
        </div>
      </div>
    </Link>
  );
}