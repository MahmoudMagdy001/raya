import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../../../lib/supabase'
import { Post } from '../../../lib/types'
import { INITIAL_POSTS } from '../../../data/initialData'
import { usePageSeo } from '../../../components/common/SEO'
import { 
  Clock, 
  Eye, 
  ArrowUpLeft, 
  Search, 
  Tag, 
  Calendar,
  BookOpen
} from 'lucide-react'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  usePageSeo({
    title: 'مدونة راية والمعرفة الرقمية | رؤى وأفكار في صناعة المحتوى والذكاء الاصطناعي',
    description: 'مقالات وأفكار ودراسات متخصصة في صناعة الفيديو القصير، استراتيجيات التسويق الإبداعي، وتطبيقات الذكاء الاصطناعي للشركات والعلامات التجارية في السعودية.',
    keywords: 'مدونة تسويق, صناعة محتوى, ريلز, تيك توك, ذكاء اصطناعي, الرياض, شركات سعودية, تصوير سينمائي'
  })

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await getPosts()
      if (data && data.length > 0) {
        setPosts(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  // Extract unique categories
  const publishedPosts = posts.filter((p) => !p.status || p.status === 'published')
  const categories = ['all', ...Array.from(new Set(publishedPosts.map((p) => p.category).filter(Boolean)))]

  // Filter posts
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
    return matchesCategory && matchesSearch
  })

  // Featured post (first post in published list)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : []

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'مؤخراً'
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return 'مؤخراً'
    }
  }

  return (
    <div className="bg-[#FAF7F2]">
      {/* Header Section */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4EFE6]">
            مدونة راية{' '}
            <span className="relative inline-block text-[#C5A880]">
              والمعرفة الرقمية
              <svg
                className="absolute -bottom-2 right-0 w-full h-2.5 text-[#C5A880]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#b9d5c7] max-w-2xl mx-auto leading-relaxed pt-2">
            رؤى تحليلية، استراتيجيات صناعة المحتوى المؤثر، وأحدث اتجاهات الذكاء الاصطناعي لرواد الأعمال والعلامات التجارية في المملكة.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المقالات والمواضيع والكلمات المفتاحية..."
                className="w-full bg-[#12372A]/90 border border-[#205341] rounded-2xl py-3.5 pr-12 pl-4 text-sm text-[#F4EFE6] placeholder-[#7d9f8e] focus:outline-hidden focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
              />
              <Search className="w-5 h-5 text-[#C5A880] absolute right-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#b9d5c7] hover:text-white bg-white/10 px-2 py-1 rounded-md"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-[#E5DFD3] py-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#12372A] text-[#F3D7A4] shadow-md shadow-[#12372A]/15 border border-[#E5C378]/30 scale-105'
                    : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]/30 hover:bg-[#FAF7F2]'
                }`}
              >
                {cat === 'all' ? `جميع المقالات (${publishedPosts.length})` : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-[#5a7769]">جاري تحميل المقالات...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-white rounded-3xl border border-[#E5DFD3] p-12">
            <BookOpen className="w-12 h-12 text-[#C5A880] mx-auto opacity-70" />
            <h3 className="text-xl font-bold text-[#12372A]">لم نتمكن من إيجاد مقالات تطابق بحثك</h3>
            <p className="text-sm text-[#5a7769]">جرب كتابة كلمات مفتاحية أخرى أو اختر تصنيفاً مختلفاً.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#12372A] text-[#F3D7A4] rounded-full text-xs font-bold hover:bg-[#205341] transition-all"
            >
              عرض كافة المقالات
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post Card (Hero Highlight) */}
            {featuredPost && (
              <article className="group bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] hover:border-[#C5A880] shadow-sm hover:shadow-2xl hover:shadow-[#12372A]/10 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#0B221A]">
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#C5A880] text-[#12372A] shadow-md">
                        مقال مميز
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#5a7769]">
                        <span className="px-3 py-1 rounded-full bg-[#FAF7F2] text-[#12372A] font-bold border border-[#E5DFD3]">
                          {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                          {featuredPost.reading_time || 4} دقائق قراءة
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                          {formatDate(featuredPost.published_at || featuredPost.created_at)}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] group-hover:text-[#205341] transition-colors leading-snug">
                        <Link to={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-[#4f6b5c] leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {featuredPost.excerpt}
                      </p>

                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {featuredPost.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5a7769] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E5DFD3]/60">
                              <Tag className="w-2.5 h-2.5 text-[#C5A880]" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#E5DFD3] flex items-center justify-between">
                      <div className="text-xs font-bold text-[#12372A]">
                        بقلم: <span className="text-[#C5A880]">{featuredPost.author || 'فريق راية الإبداعي'}</span>
                      </div>
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-[#12372A] group-hover:text-[#205341] transition-colors"
                      >
                        <span>قراءة المقال كاملاً</span>
                        <div className="w-8 h-8 rounded-full bg-[#12372A]/8 group-hover:bg-[#12372A] group-hover:text-[#F3D7A4] text-[#12372A] flex items-center justify-center transition-all">
                          <ArrowUpLeft className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Remaining Articles Grid */}
            {regularPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black text-[#12372A]">المقالات والدراسات الحديثة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] hover:border-[#C5A880] shadow-sm hover:shadow-xl hover:shadow-[#12372A]/8 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-[#0B221A]">
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#12372A]/90 backdrop-blur-md text-[#F3D7A4] border border-[#E5C378]/30 shadow-xs">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs text-[#7d9f8e] mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                              {post.reading_time || 4} د
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                              {post.views_count || 0} قراءة
                            </span>
                          </div>

                          <h4 className="text-lg font-black text-[#12372A] group-hover:text-[#205341] transition-colors leading-snug mb-2.5 line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h4>

                          <p className="text-xs sm:text-sm text-[#4f6b5c] leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Footer Link */}
                      <div className="px-6 pb-6 pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#5a7769]">
                          {post.author || 'فريق راية الإبداعي'}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#12372A] group-hover:text-[#205341] transition-colors"
                        >
                          <span>اقرأ الآن</span>
                          <ArrowUpLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Master CTA Section (Same as Home page) */}
      <MasterCtaSection />
    </div>
  )
}
