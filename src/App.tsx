import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NotFound } from './components/NotFound';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { ProjectFilters } from './components/ProjectFilters';
import { ProjectModal } from './components/ProjectModal';
import { BlogCard } from './components/BlogCard';
import { BlogPage } from './components/BlogPage';
import { BlogPostArticlePage } from './components/BlogPostArticlePage';
import { BlogPostModal } from './components/BlogPostModal';
import { LoginModal } from './components/LoginModal';
import { AdminModal } from './components/AdminModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { NewsletterSection } from './components/NewsletterSection';
import { TeamSection } from './components/TeamSection';
import { LiveChatWidget } from './components/LiveChatWidget';
import { PartnersTicker } from './components/PartnersTicker';
import { Footer } from './components/Footer';
import { ServicesSection } from './components/ServicesSection';

import { Project, BlogPost, Comment, Subscriber, User, ThemeMode, Partner, TeamMember } from './types';
import {
  fetchProjects,
  fetchBlogPosts,
  fetchComments,
  fetchSubscribers,
  fetchPartners,
  fetchTeamMembers,
  getCurrentUser,
  postComment,
  likeComment,
  approveComment,
  deleteComment,
  logout
} from './services/api';
import { resetDefaultSEO } from './utils/seo';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Auth & Data state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeSection, setActiveSection] = useState<'projetos' | 'blog' | 'equipe' | 'criadores' | 'notfound'>('projetos');
  
  // Route state for separate article pages
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | null>(null);

  // Sync route with window.location.hash (#/blog/:slug)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '' || hash === '#/') {
        setActiveSection('projetos');
        setCurrentArticleSlug(null);
      } else if (hash.startsWith('#/blog/')) {
        const slug = hash.replace('#/blog/', '');
        if (slug && slug !== 'all') {
          setCurrentArticleSlug(slug);
          setActiveSection('blog');
        } else {
          setCurrentArticleSlug(null);
          setActiveSection('blog');
          resetDefaultSEO();
        }
      } else {
        setActiveSection('notfound');
        setCurrentArticleSlug(null);
        resetDefaultSEO();
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [architectureModalOpen, setArchitectureModalOpen] = useState(false);

  // Apply Theme Class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initial Data Load
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [projData, blogData, commData, partnerData, teamData, user] = await Promise.all([
        fetchProjects(),
        fetchBlogPosts(),
        fetchComments(),
        fetchPartners(),
        fetchTeamMembers(),
        getCurrentUser()
      ]);

      setProjects(projData);
      setBlogPosts(blogData);
      setComments(commData);
      setPartners(partnerData);
      setTeamMembers(teamData);
      setCurrentUser(user);

      if (user) {
        try {
          const subs = await fetchSubscribers();
          setSubscribers(subs);
        } catch (e) {
          // ignore if subscriber fetch fails
        }
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleRefreshData = async () => {
    try {
      const [projData, blogData, commData, partnerData, teamData] = await Promise.all([
        fetchProjects(),
        fetchBlogPosts(),
        fetchComments(),
        fetchPartners(),
        fetchTeamMembers()
      ]);
      setProjects(projData);
      setBlogPosts(blogData);
      setComments(commData);
      setPartners(partnerData);
      setTeamMembers(teamData);
      if (currentUser) {
        const subs = await fetchSubscribers();
        setSubscribers(subs);
      }
    } catch (err) {
      console.error('Erro ao atualizar dados:', err);
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    handleRefreshData();
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setAdminModalOpen(false);
  };

  // Comment Handlers
  const handleAddComment = async (data: { targetType: 'project' | 'blog'; targetId: string; authorName: string; authorEmail: string; content: string }) => {
    const newComm = await postComment(data);
    setComments(prev => [newComm, ...prev]);
    // refresh project or blog counts
    handleRefreshData();
  };

  const handleLikeComment = async (id: string) => {
    const res = await likeComment(id);
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, likes: res.likes } : c))
    );
  };

  const handleApproveComment = async (id: string) => {
    const updated = await approveComment(id);
    setComments(prev =>
      prev.map(c => (c.id === id ? updated : c))
    );
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
    setComments(prev => prev.filter(c => c.id !== id));
  };

  // Filtered Lists
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = selectedCategory === 'Todos' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const filteredBlogPosts = useMemo(() => {
    return blogPosts.filter(b => {
      const matchCat = selectedCategory === 'Todos' || b.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !searchQuery.trim() ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  // Projects Pagination (6 items per page)
  const PROJECTS_PER_PAGE = 6;
  const [currentProjectPage, setCurrentProjectPage] = useState(1);

  // Reset to page 1 on filter or search changes
  useEffect(() => {
    setCurrentProjectPage(1);
  }, [searchQuery, selectedCategory]);

  const totalProjectPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentProjectPage]);

  const handleProjectPageChange = (page: number) => {
    setCurrentProjectPage(page);
    const element = document.getElementById('projetos-section') || document.getElementById('main-content');
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const activeArticle = useMemo(() => {
    if (!currentArticleSlug) return null;
    return blogPosts.find(b => b.slug === currentArticleSlug || b.id === currentArticleSlug) || null;
  }, [currentArticleSlug, blogPosts]);

  const relatedProjectForPost = useMemo(() => {
    const post = activeArticle || selectedBlogPost;
    if (!post || !post.projectId) return undefined;
    return projects.find(p => p.id === post.projectId);
  }, [activeArticle, selectedBlogPost, projects]);

  const handleNavigate = (section: string) => {
    setActiveSection(section as any);
    if (section !== 'blog') {
      setCurrentArticleSlug(null);
      resetDefaultSEO();
    }
    setTimeout(() => {
      let targetId = 'main-content';
      if (section === 'equipe' || section === 'criadores') {
        targetId = 'equipe';
      } else if (section === 'projetos') {
        targetId = 'projetos-section';
      } else if (section === 'blog') {
        targetId = 'blog-section';
      }

      const element = document.getElementById(targetId) || document.getElementById('main-content');
      if (element) {
        const yOffset = -70; // Header height compensation
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Header
        currentUser={currentUser}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Hero Section with integrated Partners Ticker above filters */}
      {activeSection === 'projetos' && (
        <Hero
          onNavigate={handleNavigate}
          partners={partners}
          projectsCount={projects.length}
        />
      )}

      {/* Main Content Area with Fluid Responsive Width for Desktop & Mobile */}
      <main id="main-content" className="flex-1 w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-24 lg:px-32 2xl:px-64 py-10 sm:py-14 space-y-12 sm:space-y-16">
        
        {/* NOT FOUND ROUTE */}
        {activeSection === 'notfound' && <NotFound onNavigate={handleNavigate} />}
        
        {/* SECTION 1: PROJECTS GALLERY */}
        {activeSection === 'projetos' && (
          <div id="projetos-section" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                  Galeria de Projetos & Aplicações ({filteredProjects.length})
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
                  Aplicações completas, SaaS, e-commerce e sistemas desenvolvidos com arquitetura limpa
                </p>
              </div>

              <span className="text-xs sm:text-sm text-slate-500 font-mono">
                {searchQuery ? `Filtrando por "${searchQuery}"` : 'Exibindo todos os projetos'}
              </span>
            </div>

            <ProjectFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20 space-y-4 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                  Nenhum projeto encontrado para o filtro selecionado.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 rounded-xl font-bold cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                >
                  Limpar filtros de busca
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                  {paginatedProjects.map((project, idx) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={idx}
                      onPreview={(p) => setSelectedProject(p)}
                      currentUser={currentUser}
                      onEdit={() => setAdminModalOpen(true)}
                      onDelete={() => setAdminModalOpen(true)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalProjectPages > 1 && (
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
                      Exibindo <span className="font-bold text-slate-900 dark:text-white">{(currentProjectPage - 1) * PROJECTS_PER_PAGE + 1}</span> a <span className="font-bold text-slate-900 dark:text-white">{Math.min(currentProjectPage * PROJECTS_PER_PAGE, filteredProjects.length)}</span> de <span className="font-bold text-slate-900 dark:text-white">{filteredProjects.length}</span> projetos
                    </p>

                    <div className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      {/* Previous Page */}
                      <button
                        onClick={() => handleProjectPageChange(currentProjectPage - 1)}
                        disabled={currentProjectPage === 1}
                        className="p-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                        aria-label="Página anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Anterior</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: totalProjectPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handleProjectPageChange(pageNum)}
                            className={`w-8 h-8 text-xs font-bold font-mono rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                              currentProjectPage === pageNum
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      {/* Next Page */}
                      <button
                        onClick={() => handleProjectPageChange(currentProjectPage + 1)}
                        disabled={currentProjectPage === totalProjectPages}
                        className="p-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                        aria-label="Próxima página"
                      >
                        <span className="hidden sm:inline">Próxima</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* SECTION 2: STANDALONE BLOG & INDIVIDUAL ARTICLE PAGES */}
        {activeSection === 'blog' && (
          <div id="blog-section">
            {activeArticle ? (
              /* Dedicated Single News / Article Page for Google Indexing & Direct URL */
              <BlogPostArticlePage
                post={activeArticle}
                onBackToBlog={() => {
                  window.location.hash = '#/blog';
                  setCurrentArticleSlug(null);
                  resetDefaultSEO();
                }}
                relatedProject={relatedProjectForPost}
                onOpenProject={(proj) => {
                  setCurrentArticleSlug(null);
                  setSelectedProject(proj);
                  setActiveSection('projetos');
                }}
                currentUser={currentUser}
                comments={comments}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
                onApproveComment={handleApproveComment}
                onDeleteComment={handleDeleteComment}
              />
            ) : (
              /* Dedicated Blog Main Page */
              <BlogPage
                blogPosts={blogPosts}
                onSelectPost={(p) => {
                  window.location.hash = `#/blog/${p.slug || p.id}`;
                  setCurrentArticleSlug(p.slug || p.id);
                }}
                currentUser={currentUser}
                onOpenAdmin={() => setAdminModalOpen(true)}
                onNavigate={handleNavigate}
              />
            )}
          </div>
        )}

        {/* SECTION 3: TEAM */}
        {(activeSection === 'equipe' || activeSection === 'criadores') && (
          <TeamSection teamMembers={teamMembers} />
        )}

      </main>

      <ServicesSection />

      {/* Meet Our Team Section (Always present for discovery) */}
      {activeSection !== 'equipe' && activeSection !== 'criadores' && (
        <TeamSection teamMembers={teamMembers} />
      )}

      {/* Newsletter retention box */}
      <NewsletterSection />

      {/* Footer */}
      <Footer
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* MODALS */}

      {/* Project Previewer Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentUser={currentUser}
        comments={comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        onApproveComment={handleApproveComment}
        onDeleteComment={handleDeleteComment}
      />

      {/* Blog Article Reader Modal */}
      <BlogPostModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
        relatedProject={relatedProjectForPost}
        onOpenProject={(proj) => {
          setSelectedBlogPost(null);
          setSelectedProject(proj);
        }}
        currentUser={currentUser}
        comments={comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        onApproveComment={handleApproveComment}
        onDeleteComment={handleDeleteComment}
      />

      {/* Admin JWT Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin CMS Manager Modal */}
      {currentUser && (
        <AdminModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
          currentUser={currentUser}
          projects={projects}
          blogPosts={blogPosts}
          comments={comments}
          subscribers={subscribers}
          partners={partners}
          teamMembers={teamMembers}
          onRefreshData={handleRefreshData}
          onLogout={handleLogout}
        />
      )}

      {/* Architecture & Tech Stack Modal */}
      <ArchitectureModal
        isOpen={architectureModalOpen}
        onClose={() => setArchitectureModalOpen(false)}
      />

      {/* Floating Client Contact & Live Chat Widget */}
      <LiveChatWidget hidden={adminModalOpen || loginModalOpen} />

    </div>
  );
}
