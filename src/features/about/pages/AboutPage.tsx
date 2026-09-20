import React from 'react'
import { Link } from 'react-router-dom'
import { Target, Lightbulb, Award, Users, Eye, TrendingUp, Sparkles, ArrowUpLeft, ShieldCheck } from 'lucide-react'
import { CORE_VALUES } from '../../../data/initialData'

export const AboutPage: React.FC = () => {
  const getValueIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target className="w-6 h-6 text-[#C5A880]" />
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-[#C5A880]" />
      case 'Award': return <Award className="w-6 h-6 text-[#C5A880]" />
      case 'Users': return <Users className="w-6 h-6 text-[#C5A880]" />
      case 'Eye': return <Eye className="w-6 h-6 text-[#C5A880]" />
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#C5A880]" />
      default: return <Sparkles className="w-6 h-6 text-[#C5A880]" />
    }
  }

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#205341] text-[#C5A880] text-xs font-bold">
            <span>من نحن؟</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            عن رايـة — قصة شغف سعودية
          </h1>
          <p className="text-lg sm:text-xl text-[#b9d5c7] max-w-3xl mx-auto leading-relaxed">
            نعيد تعريف صناعة المحتوى والإنتاج الفني للشركات والمؤثرين بروح وطنية تترجم طموحات المستقبل.
          </p>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12372A]">
                راية شركة إنتاج إبداعي سعودية
              </h2>
              <p className="text-base sm:text-lg text-[#335948] leading-relaxed">
                متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص.
              </p>
              <p className="text-base text-[#6b7f74] leading-relaxed">
                نحن لا نكتفي بمجرد تصوير ما يطلبه العميل بالأسلوب التقليدي، بل نعتبر أنفسنا شركاء فكر؛ نشارك في بناء الفكرة من جذورها وطريقة تقديمها المبتكرة، لنضمن بكل ثقة أن المحتوى يخدم الهدف الموضوع، ويخاطب العقلية المناسبة للجمهور، ويظهر بالشكل اللائق على كل منصة عرض.
              </p>

              <div className="p-6 bg-white rounded-2xl border border-[#E5DFD3] space-y-2">
                <h4 className="text-base font-bold text-[#12372A]">
                  طريقتنا في العمل:
                </h4>
                <p className="text-sm text-[#6b7f74] leading-relaxed">
                  ما نصنع محتوى لمجرد إن فيه منشور لازم ينزل أو جدول زمني يحتاج تعبئة! كل قطعة محتوى نشتغل عليها لا بد أن تمتلك: هدفاً استراتيجياً واضحاً، جمهوراً محدداً بعناية، ورسالة ملهمة تصل بأقصر الطرق وأكثرها تأثيراً.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                  alt="فريق راية الإبداعي"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#12372A] text-[#F4EFE6] p-6 rounded-2xl shadow-xl border border-[#C5A880]/30 hidden sm:block max-w-xs">
                <p className="text-xs font-bold text-[#C5A880] mb-1">شعارنا الخالد</p>
                <p className="text-sm font-extrabold">أفكار تصنع الفرق</p>
                <p className="text-[11px] text-[#b9d5c7] mt-1">Ideas Make the Difference</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 bg-[#FAF7F2] border-y border-[#E5DFD3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#12372A] flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-black text-[#12372A] mb-4">
                  مهمتنا — Our Mission
                </h3>
                <p className="text-base text-[#335948] leading-relaxed">
                  «نحوّل أهداف وأفكار العلامات التجارية إلى محتوى واضح، مبتكر، ومصنوع باحتراف؛ يساعدها على الظهور، والتواصل، وصناعة تأثير حقيقي مستدام.»
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E5DFD3] flex items-center gap-2 text-xs font-bold text-[#6b7f74]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>التزام بالجودة والدقة في كل إطار</span>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#12372A] flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-black text-[#12372A] mb-4">
                  رؤيتنا — Our Vision
                </h3>
                <p className="text-base text-[#335948] leading-relaxed">
                  «أن تكون راية شريكاً إبداعياً موثوقاً للعلامات التجارية التي تبحث عن محتوى له شخصية، وهدف، وتأثير لا يُمحى في المشهد الرقمي السعودي والعربي.»
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E5DFD3] flex items-center gap-2 text-xs font-bold text-[#6b7f74]">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>مواكبة تطلعات رؤية السعودية 2030</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Values */}
      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#12372A]">
              قيم راية الستة
            </h2>
            <p className="mt-3 text-base text-[#6b7f74]">
              المبادئ الجوهرية التي تحكم كل مشروع ونبضة إبداعية في أروقة راية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => (
              <div
                key={val.number}
                className="bg-white p-7 rounded-2xl border border-[#E5DFD3] shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#C5A880]">
                    {val.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#12372A] flex items-center justify-center">
                    {getValueIcon(val.icon)}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#12372A] mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-[#6b7f74] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#12372A] text-[#F4EFE6] px-8 py-4 rounded-full font-bold shadow-md hover:bg-[#174233] transition-colors"
            >
              <span>دعنا نبدأ شراكتنا الإبداعية القادمة</span>
              <ArrowUpLeft className="w-5 h-5 text-[#C5A880]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
