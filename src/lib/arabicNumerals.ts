/**
 * نظام تحويل وتنسيق الأرقام إلى الأرقام العربية الشرقية (٠، ١، ٢، ٣، ٤، ٥، ٦، ٧، ٨، ٩)
 * يدعم التحويل البرمجي الصريح والتحويل التلقائي الآمن للـ DOM مع حماية حقول الإدخال والمحررات.
 */

const WESTERN_TO_EASTERN_ARABIC_DIGITS: Record<string, string> = {
  '0': '٠',
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩'
}

/**
 * تحويل أي رقم أو نص يحتوي على أرقام لاتينية (0-9) إلى أرقام عربية (٠-٩)
 */
export function toArabicNumerals(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return ''
  return String(val).replace(/[0-9]/g, (digit) => WESTERN_TO_EASTERN_ARABIC_DIGITS[digit] || digit)
}

/**
 * فحص ما إذا كان عنصر الـ DOM نصياً يجب تخطيه (مثل حقول الإدخال، المحررات، الأكواد)
 */
function shouldSkipNode(node: Node): boolean {
  const parent = node.parentElement
  if (!parent) return true

  const tagName = parent.tagName
  // 1. استثناء حقول الإدخال والاختيار
  if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(tagName)) {
    return true
  }

  // 2. استثناء الأكواد والوسوم التقنية
  if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'KBD', 'SAMP', 'SVG', 'NOSCRIPT'].includes(tagName)) {
    return true
  }

  // 3. استثناء المحررات الغنية لتجنب تشويش مؤشر الكتابة (TipTap / ProseMirror)
  if (parent.closest('[contenteditable="true"], .tiptap, .ProseMirror, [data-no-arabic-numbers]')) {
    return true
  }

  // 4. استثناء النصوص التي تمثل روابط كاملة أو عناوين بريد إلكتروني
  const text = (node.nodeValue || '').trim()
  if (/^(https?:\/\/|mailto:|tel:|\S+@\S+\.\S+)/i.test(text)) {
    return true
  }

  return false
}

/**
 * معالجة وتحويل عقدة نصية مفردة
 */
function processTextNode(node: Node) {
  if (node.nodeType !== Node.TEXT_NODE) return

  const val = node.nodeValue
  // إذا لم يكن هناك أي رقم لاتيني، نخرج فوراً لمنع أي معالجة زائدة أو حلقات تكرار
  if (!val || !/[0-9]/.test(val)) return

  if (shouldSkipNode(node)) return

  const converted = toArabicNumerals(val)
  if (converted !== val) {
    node.nodeValue = converted
  }
}

/**
 * مسح جميع العقد النصية في شجرة عناصر معينة
 */
function walkAndProcess(element: Element) {
  // تخطي العناصر المستثناة مباشرة
  const tagName = element.tagName
  if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'SCRIPT', 'STYLE', 'CODE', 'PRE', 'SVG'].includes(tagName)) {
    return
  }
  if (element.closest('[contenteditable="true"], .tiptap, .ProseMirror, [data-no-arabic-numbers]')) {
    return
  }

  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT
        return /[0-9]/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      }
    }
  )

  let currentNode = walker.nextNode()
  while (currentNode) {
    processTextNode(currentNode)
    currentNode = walker.nextNode()
  }
}

/**
 * تشغيل مراقب الـ DOM الشامل لتحديث الأرقام تلقائياً وفورياً عبر كل صفحات ومكونات الموقع
 */
export function initArabicNumeralsObserver(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {}
  }

  const startObserver = () => {
    if (!document.body) return () => {}

    // 1. مسح أولي لكامل محتوى الصفحة
    walkAndProcess(document.body)

    // 2. مراقبة التحديثات اللحظية والتنقل بين الصفحات وتدفق البيانات من Supabase
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              processTextNode(node)
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              walkAndProcess(node as Element)
            }
          })
        } else if (mutation.type === 'characterData') {
          processTextNode(mutation.target)
        }
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })

    return () => observer.disconnect()
  }

  if (document.readyState === 'loading') {
    let cleanup: (() => void) | undefined
    const onLoaded = () => {
      cleanup = startObserver()
      document.removeEventListener('DOMContentLoaded', onLoaded)
    }
    document.addEventListener('DOMContentLoaded', onLoaded)
    return () => cleanup?.()
  }

  return startObserver()
}
