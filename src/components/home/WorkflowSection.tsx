import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check
} from 'lucide-react'
import { toArabicNumerals } from '../../lib/arabicNumerals'

interface WorkflowStep {
  stepNum: string
  stepAr: string
  title: string
  highlight: string
  desc: string
  tags: string[]
  quote: string
}

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps: WorkflowStep[] = [
    {
      stepNum: '٠١',
      stepAr: '١',
      title: 'نفهم المشروع',
      highlight: 'البداية السليمة',
      desc: 'نجلس معك ونستمع لأهدافك بعناية، لنفكك هوية مشروعك واحتياجه الفعلي، ونحدد الجمهور المستهدف الذي نريد الوصول إليه والتأثير فيه بدقة.',
      tags: ['جلسة استماع وتفكيك', 'تحليل الجمهور المستهدف', 'موجز المشروع الإبداعي'],
      quote: '«المشروع الناجح يبدأ بالاستماع العميق وتحديد البوصلة قبل بدء التصوير.»'
    },
    {
      stepNum: '٠٢',
      stepAr: '٢',
      title: 'نحدد الهدف',
      highlight: 'وضوح الغاية',
      desc: 'نضع مؤشرات واضحة لما يجب أن يحققه المحتوى: صناعة وعي واسع، ترسيخ هوية، زيادة مبيعات، أو تحقيق تفاعل وانتشار رقمي محسوب.',
      tags: ['مؤشرات الأداء KPIs', 'تحديد المنصات ذات الأولوية', 'معايير قياس العائد'],
      quote: '«كل لقطة نصنعها في راية لها غاية استراتيجية تخدم نمو علامتك التجارية.»'
    },
    {
      stepNum: '٠٣',
      stepAr: '٣',
      title: 'نطوّر الفكرة',
      highlight: 'سر الجاذبية',
      desc: 'نحوّل الهدف المجرد إلى فكرة إبداعية وسيناريو مشوق يكسر الملل، مع تصميم الـ Hook في أول ٣ ثوانٍ ليجبر المشاهد على التوقف والاندماج.',
      tags: ['صياغة السيناريو الكامل', 'لوحة المزاج البصري', 'تصميم الـ Hook الخاطف'],
      quote: '«الفكرة القوية تخطف الانتباه في ثوانٍ معدودة وتترك أثراً يمتد في الذاكرة.»'
    },
    {
      stepNum: '٠٤',
      stepAr: '٤',
      title: 'نخطط للتنفيذ',
      highlight: 'الدقة اللوجستية',
      desc: 'نحدد زوايا التصوير، الطاقم الفني المتخصص، أحدث الكاميرات والإضاءة السينمائية، وجدولاً زمنياً مفصلاً يضمن سلاسة يوم التصوير بلا مفاجآت.',
      tags: ['جدول الإنتاج الميداني', 'معاينة مواقع التصوير', 'تجهيز معدات السينما'],
      quote: '«كل دقيقة تخطيط مسبق تضمن تنفيذاً سلساً وجودة بصرية تليق بك.»'
    },
    {
      stepNum: '٠٥',
      stepAr: '٥',
      title: 'نبدأ الإنتاج',
      highlight: 'الحرفية السينمائية',
      desc: 'ننزل إلى الميدان بكاميرات سينمائية عالية الدقة وعدسات فاخرة وطاقم إخراج وإضاءة سعودي محترف يحوّل السيناريو إلى مشاهد حية تخطف الأنظار.',
      tags: ['تصوير سينمائي ٤K', 'إضاءة سينمائية متقدمة', 'تسجيل صوتي نقي'],
      quote: '«الضوء، الزاوية، والعمق.. نصنع مشهداً سينمائياً يرفع مكانة علامتك فوراً.»'
    },
    {
      stepNum: '٠٦',
      stepAr: '٦',
      title: 'نراجع ونطوّر',
      highlight: 'اللمسة الأخيرة',
      desc: 'ندخل غرف المونتاج لنقص اللقطات بإيقاع ديناميكي متقن، ونضبط التلوين السينمائي الدافئ، ونهندس المؤثرات الصوتية لنبث الروح الحقيقية في العمل.',
      tags: ['مونتاج إيقاعي سريع', 'تلوين سينمائي فاخر', 'هندسة ومؤثرات صوتية'],
      quote: '«المونتاج هو السحر الذي يجمع كل الخيوط ليخرج العمل في أبهى صورة.»'
    },
    {
      stepNum: '٠٧',
      stepAr: '٧',
      title: 'نسلّم النتيجة',
      highlight: 'الجاهزية التامة',
      desc: 'نسلّمك المحتوى النهائي بأعلى جودة وجاهزية فورية للنشر بجميع المقاسات (عمودي للريلز والتيك توك، وأفقي لليوتيوب والإعلانات) مع توصيات النشر.',
      tags: ['مقاسات متعددة (9:16 / 16:9)', 'توصيات توقيت النشر', 'أرشفة سحابية كاملة'],
      quote: '«تسليم العمل ليس نهاية الرحلة، بل بداية احتفالنا بنجاح أرقامك وانتشارك.»'
    }
  ]

  const current = steps[activeStep]

  return (
    <section id="workflow" className="pt-10 sm:pt-14 pb-20 sm:pb-24 bg-[#12372A] text-[#F4EFE6] relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 bg-[#205341] rounded-full blur-3xl opacity-30" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 bg-[#C5A880] rounded-full blur-3xl opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-[#F4EFE6] tracking-tight">
            طريقة عملنا —{' '}
            <span className="relative inline-block text-[#C5A880]">
              الـ ٧ خطوات
              <svg
                className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#b9d5c7] leading-relaxed">
            كيف نحوّل الفكرة من مجرد رغبة مبدئية إلى محتوى نهائي ينافس بقوة ويحقق مستهدفاته.
          </p>
        </div>

        {/* Clean Modern Steps Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 scrollbar-none snap-x justify-start lg:justify-center">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx
            return (
              <button
                key={item.stepNum}
                onClick={() => setActiveStep(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer snap-center ${
                  isActive
                    ? 'bg-[#C5A880] text-[#12372A] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-105'
                    : 'bg-[#0E2B21] text-[#8bbba5] border-[#174233] hover:border-[#205341] hover:text-[#F4EFE6]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                    isActive ? 'bg-[#12372A] text-[#C5A880]' : 'bg-[#174233] text-[#8bbba5]'
                  }`}
                >
                  {item.stepAr}
                </span>
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>

        {/* Elegant Focused Content Card */}
        <div className="bg-[#0B221A] border border-[#205341] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden transition-all duration-300">
          {/* Subtle Watermark Number */}
          <div className="pointer-events-none absolute -bottom-8 -right-4 text-[120px] sm:text-[180px] font-black text-[#C5A880]/5 leading-none select-none font-mono">
            {current.stepNum}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Main Narrative & Tags (Right 7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#174233] text-[#C5A880] text-xs font-bold">
                  المرحلة {toArabicNumerals(activeStep + 1)} من ٧
                </span>
                <span className="text-xs text-[#8bbba5] font-medium">
                  {current.highlight}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#F4EFE6]">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-[#b9d5c7] leading-relaxed">
                {current.desc}
              </p>

              {/* Tags / Deliverables */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#12372A] border border-[#205341] text-xs text-[#F4EFE6] font-medium"
                    >
                      <Check className="w-3 h-3 text-[#C5A880]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#205341]/60">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                  className="px-4 py-2 rounded-xl bg-[#12372A] hover:bg-[#174233] text-xs font-bold text-[#b9d5c7] hover:text-[#F4EFE6] border border-[#205341] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>السابق</span>
                </button>

                <button
                  onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                  className="px-5 py-2 rounded-xl bg-[#C5A880] hover:bg-[#b38e5c] text-xs font-bold text-[#12372A] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>المرحلة التالية</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Clean Artistic Quote & Visual Card (Left 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#12372A]/70 border border-[#205341] rounded-2xl p-6 relative overflow-hidden">
                <div className="mb-4">
                  <span className="text-[11px] text-[#8bbba5] block font-medium">بصمة راية</span>
                  <span className="text-sm font-bold text-[#F4EFE6]">{current.highlight}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#C5A880] italic leading-relaxed">
                  {current.quote}
                </p>

                <div className="mt-4 pt-3 border-t border-[#205341]/60 flex items-center justify-between text-[11px] text-[#8bbba5]">
                  <span>الخطوة {current.stepAr} من ٧</span>
                  <span className="text-[#F4EFE6] font-medium">{current.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
