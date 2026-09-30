import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Search, MessageSquare, ArrowRight, Calendar, Clock, Share2, Layers, ShieldCheck, Mail, Phone } from 'lucide-react';
import { BlogPost, User, Project } from '../types';
import { BlogCard } from './BlogCard';

interface BlogPageProps {
  blogPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  currentUser: User | null;
  onOpenAdmin: () => void;
  onNavigate: (section: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  blogPosts,
  onSelectPost,
  currentUser,
  onOpenAdmin,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Backend', 'Frontend', 'Arquitetura', 'Segurança', 'Engenharia'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchCat = selectedCategory === 'Todos' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0] || blogPosts[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Blog Dedicated Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold font-mono">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>REALPREMISE Tech Journal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Artigos, Engenharia & Arquitetura Web
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Explorações profundas sobre Spring Boot, Angular, React, arquitetura de sistemas reativos, segurança JWT e boas práticas de desenvolvimento web sob medida.
          </p>

          {/* Search & Categories Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar artigos por tema ou tecnologia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900/90 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article Spotlight Banner */}
      {featuredPost && !searchQuery && selectedCategory === 'Todos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
              ★ Artigo em Destaque
            </h2>
          </div>

          <div
            onClick={() => onSelectPost(featuredPost)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 aspect-video lg:aspect-auto relative overflow-hidden bg-slate-950">
              <img
                src={featuredPost.coverUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold font-mono text-indigo-600 dark:text-indigo-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800">
                    {featuredPost.category}
                  </span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {featuredPost.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{featuredPost.author.name}</span>
                </div>

                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Ler Artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Articles Feed & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            Todos os Artigos ({filteredPosts.length})
          </h3>
          {currentUser && (
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              + Publicar Novo Artigo
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              Nenhum artigo encontrado para a busca selecionada.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 underline font-medium cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, idx) => {
              const showAdAfter = idx === 1; // Inject self-promotional card inside grid

              return (
                <React.Fragment key={post.id}>
                  <BlogCard
                    post={post}
                    index={idx}
                    onSelect={onSelectPost}
                    searchQuery={searchQuery}
                    currentUser={currentUser}
                    onEdit={onOpenAdmin}
                    onDelete={onOpenAdmin}
                  />

                  {/* PROMOTIONAL GRID AD CARD */}
                  {showAdAfter && (
                    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-bold">
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>Anúncio Oficial REALPREMISE</span>
                        </div>

                        <h4 className="text-xl font-bold font-display tracking-tight text-white leading-snug">
                          Crie Seu Site Com um Especialista em Engenharia Web
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          Do design da interface à arquitetura de banco de dados e APIs seguras. Soluções completas sob medida para o seu negócio.
                        </p>
                      </div>

                      <div className="space-y-2 relative z-10 pt-2 border-t border-slate-800">
                        <a
                          href="https://wa.me/556192035053?text=Olá!%20Estava%20lendo%20o%20blog%20da%20REALPREMISE%20e%20gostaria%20de%20criar%20meu%20site."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <span>Falar com o Especialista (+55 61 9203-5053)</span>
                        </a>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
