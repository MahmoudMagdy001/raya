import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPostBySlug, getPosts } from '../../../lib/supabase'
import { Post } from '../../../lib/types'
import { usePageSeo } from '../../../components/common/SEO'
import { 
  ArrowRight, 
  Clock, 
  Eye, 
  Calendar, 
  Share2, 
  Tag, 
  ArrowUpLeft, 
  Check, 
  Sparkles,
  ChevronLeft
} from 'lucide-react'

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  usePageSeo({
    title: post?.meta_title || (post ? `${post.title} | مدونة راية` : 'مدونة راية'),
    description: post?.meta_description || post?.excerpt,
    keywords: post?.meta_keywords || (post?.tags ? post.tags.join(', ') : undefined),
    ogImage: post?.og_image || post?.cover_image,
    canonicalUrl: post?.canonical_url,
    noIndex: post?.no_index
  })

  useEffect(() => {
    async function load() {
      if (!slug) return
      setLoading(true)
      const p = await getPostBySlug(slug)
      setPost(p || null)

      const all = await getPosts()
      if (all) {
        const others = all.filter((item) => item.slug !== slug && (!item.status || item.status === 'published'))
        setRelatedPosts(others.slice(0, 3))
      }
      setLoading(false)
    }
    load()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'مؤخراً'
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return 'مؤخراً'
    }
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#0B221A] text-[#F4EFE6]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#b9d5c7]">جاري تحميل المقال...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#0B221A] text-[#F4EFE6]">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#F4EFE6]">المقال غير متوفر</h2>
          <p className="text-sm text-[#b9d5c7]">ربما تم نقل المقال أو حذفه مؤقتاً.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5A880] text-[#12372A] rounded-full font-bold text-sm shadow-md"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمدونة راية</span>
          </Link>
        </div>
      </div>
    )
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="pb-24 bg-[#FAF7F2]">
      {/* Header / Hero Section */}
      <section className="pt-36 pb-16 bg-[#12372A] text-[#F4EFE6] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Back to Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A880] hover:text-[#f3d7a4] transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة إلى كافة المقالات</span>
          </Link>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-[#C5A880] text-[#12372A] font-black shadow-xs">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[#b9d5c7]">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              {post.reading_time || 4} دقائق قراءة
            </span>
            <span className="text-[#205341]">•</span>
            <span className="flex items-center gap-1.5 text-[#b9d5c7]">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span className="text-[#205341]">•</span>
            <span className="flex items-center gap-1.5 text-[#b9d5c7]">
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              {post.views_count || 0} قراءة
            </span>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F4EFE6] leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-[#b9d5c7] leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="pt-2 flex items-center justify-between border-t border-[#174233]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#12372A] border border-[#C5A880]/40 flex items-center justify-center text-sm font-black text-[#F3D7A4]">
                {post.author ? post.author.charAt(0) : 'ر'}
              </div>
              <div>
                <p className="text-xs text-[#7d9f8e]">كتب المقال</p>
                <p className="text-sm font-bold text-[#F4EFE6]">{post.author || 'فريق راية الإبداعي'}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#12372A] hover:bg-[#25D366] text-[#F4EFE6] hover:text-white flex items-center justify-center transition-colors"
                title="مشاركة على واتساب"
                aria-label="مشاركة على واتساب"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#12372A] hover:bg-[#C5A880] text-[#F4EFE6] hover:text-[#12372A] flex items-center justify-center transition-colors text-xs font-bold"
                title="مشاركة على منصة X"
                aria-label="مشاركة على منصة X"
              >
                𝕏
              </a>
              <button
                onClick={handleCopyLink}
                className="w-9 h-9 rounded-full bg-[#12372A] hover:bg-[#C5A880] text-[#F4EFE6] hover:text-[#12372A] flex items-center justify-center transition-colors"
                title="نسخ رابط المقال"
                aria-label="نسخ الرابط"
              >
                {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5DFD3] bg-[#0B221A] mb-12">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DFD3] shadow-sm space-y-8">
          <div className="prose prose-lg max-w-none text-[#2d473b] leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim()
              if (!trimmed) return null

              // Heading 2
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-black text-[#12372A] pt-4 pb-2 border-b border-[#E5DFD3]">
                    {trimmed.replace('## ', '')}
                  </h2>
                )
              }

              // Heading 3
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-black text-[#12372A] pt-2">
                    {trimmed.replace('### ', '')}
                  </h3>
                )
              }

              // Quote block
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-r-4 border-[#C5A880] pr-4 py-2 bg-[#FAF7F2] rounded-l-xl text-base sm:text-lg font-bold text-[#12372A] italic my-4">
                    {trimmed.replace('> ', '')}
                  </blockquote>
                )
              }

              // Bullet points
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const items = trimmed.split('\n').filter(Boolean)
                return (
                  <ul key={idx} className="space-y-2.5 my-4">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#3d5a4c]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 mt-2.5" />
                        <span>{item.replace(/^[-*]\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                )
              }

              // Regular paragraph
              return (
                <p key={idx} className="text-base sm:text-lg text-[#3d5a4c] leading-loose">
                  {trimmed}
                </p>
              )
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-[#E5DFD3]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#12372A] ml-2">وسوم المقال:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#205341] border border-[#E5DFD3]"
                  >
                    <Tag className="w-3 h-3 text-[#C5A880]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box inside Article */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0B221A] to-[#12372A] text-[#F4EFE6] space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#205341] text-[#F3D7A4] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>جاهز لتطبيق هذه الاستراتيجية في مشروعك؟</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F4EFE6]">
              دعنا نحوّل هذه الأفكار إلى محتوى سينمائي فاخر لعلامتك التجارية
            </h3>
            <p className="text-sm text-[#b9d5c7] leading-relaxed max-w-2xl">
              تحدث مع خبرائنا في راية لمناقشة أهدافك، وسنصيغ لك استراتيجية إنتاج متكاملة تضمن الانتشار والتحويل.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b0926b] text-[#12372A] px-6 py-3 rounded-full text-sm font-black shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>ابدأ بريف مشروعك الآن</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/works"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-[#F4EFE6] px-5 py-3 rounded-full text-sm font-bold transition-colors"
              >
                <span>استكشف أعمالنا وقصص نجاحنا</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-[#12372A]">مقالات ذات صلة</h3>
              <Link to="/blog" className="text-xs font-bold text-[#C5A880] hover:text-[#12372A] flex items-center gap-1">
                <span>عرض كافة المقالات</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((r) => (
                <article
                  key={r.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5DFD3] hover:border-[#C5A880] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 overflow-hidden bg-[#0B221A]">
                      <img
                        src={r.cover_image}
                        alt={r.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-bold text-[#C5A880] mb-2 inline-block">
                        {r.category}
                      </span>
                      <h4 className="text-sm font-black text-[#12372A] group-hover:text-[#205341] transition-colors line-clamp-2 leading-snug">
                        <Link to={`/blog/${r.slug}`}>{r.title}</Link>
                      </h4>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <Link
                      to={`/blog/${r.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12372A] group-hover:text-[#205341]"
                    >
                      <span>قراءة المقال</span>
                      <ArrowUpLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
