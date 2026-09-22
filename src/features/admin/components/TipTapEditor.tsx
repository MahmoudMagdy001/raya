import React, { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Minus,
  AlignRight,
  AlignCenter,
  AlignLeft,
  AlignJustify,
  Link2,
  Unlink,
  Image as ImageIcon,
  Upload,
  Library,
  Undo2,
  Redo2,
  RemoveFormatting,
  X,
  Check,
  Loader2
} from 'lucide-react'
import { uploadMediaFile, createMediaItem, getMediaItems } from '../../../lib/supabase'
import { MediaItem } from '../../../lib/types'

// Extended Image extension supporting custom width
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width') || element.style.width || '100%',
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
            style: `width: ${attributes.width}; max-width: 100%;`
          }
        }
      }
    }
  }
})

interface TipTapEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: string
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  placeholder = 'اكتب المحتوى الكامل للمقال هنا ونسّقه...',
  minHeight = '360px'
}) => {
  // Image insertion dialog state
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [imageTab, setImageTab] = useState<'upload' | 'library' | 'url'>('upload')
  const [directImageUrl, setDirectImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedImageWidth, setSelectedImageWidth] = useState<'100%' | '75%' | '50%' | '35%'>('100%')
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Link dialog state
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#12372A] font-bold underline decoration-[#C5A880] underline-offset-4 hover:text-[#C5A880] transition-colors',
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }),
      ResizableImage.configure({
        inline: false,
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full my-6 mx-auto shadow-md border border-[#E5DFD3] object-cover'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'right'
      }),
      Placeholder.configure({
        placeholder
      })
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px] text-[#2d473b] leading-relaxed p-4 text-base selection:bg-[#F3D7A4]/50',
        dir: 'rtl'
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      // If editor is empty, return empty string
      const isEmpty = editor.state.doc.textContent.trim().length === 0 && !editor.getHTML().includes('<img')
      onChange(isEmpty ? '' : html)
    }
  })

  // Sync external value when changed outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      // Only set if different to prevent cursor jumps
      const currentHTML = editor.getHTML()
      const isBothEmpty = (!value || value === '<p></p>') && (!currentHTML || currentHTML === '<p></p>')
      if (!isBothEmpty && value !== currentHTML) {
        editor.commands.setContent(value || '', { emitUpdate: false })
      }
    }
  }, [value, editor])

  if (!editor) {
    return (
      <div className="w-full h-48 rounded-2xl border border-[#E5DFD3] bg-[#FAF7F2] flex items-center justify-center text-sm text-[#6b7f74]">
        <Loader2 className="w-5 h-5 animate-spin text-[#C5A880] ml-2" />
        جاري تحميل المحرر...
      </div>
    )
  }

  // Handle direct file upload to Supabase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // 1. Upload to Supabase Storage
      const { url, name, type, size } = await uploadMediaFile(file)

      // 2. Save record in media_library
      await createMediaItem({
        name,
        file_url: url,
        file_type: type,
        file_size: size,
        folder: 'uploads',
        alt_text: name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      })

      // 3. Insert into TipTap with chosen width
      editor.chain().focus().setImage({ src: url, alt: name, width: selectedImageWidth } as any).run()
      setUploadSuccess(true)
      setTimeout(() => {
        setUploadSuccess(false)
        setImageModalOpen(false)
      }, 1000)
    } catch (err) {
      console.error('Failed to upload image into editor:', err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // Handle fetching media library
  const handleOpenMediaLibrary = async () => {
    setImageTab('library')
    setLoadingLibrary(true)
    try {
      const items = await getMediaItems()
      setMediaItems(items.filter((i) => i.file_type === 'image'))
    } catch (err) {
      console.error('Failed to fetch media library:', err)
    } finally {
      setLoadingLibrary(false)
    }
  }

  // Insert image from library
  const handleSelectMediaItem = (item: MediaItem) => {
    editor.chain().focus().setImage({ src: item.file_url, alt: item.alt_text || item.name, width: selectedImageWidth } as any).run()
    setImageModalOpen(false)
  }

  // Insert image via direct URL
  const handleInsertDirectUrl = (e: React.FormEvent) => {
    e.preventDefault()
    if (!directImageUrl.trim()) return
    editor.chain().focus().setImage({ src: directImageUrl.trim(), width: selectedImageWidth } as any).run()
    setDirectImageUrl('')
    setImageModalOpen(false)
  }

  // Handle links
  const handleOpenLinkModal = () => {
    const previousUrl = editor.getAttributes('link').href || ''
    setLinkUrl(previousUrl)
    setLinkModalOpen(true)
  }

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (linkUrl.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      const formattedUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`
      editor.chain().focus().extendMarkRange('link').setLink({ href: formattedUrl }).run()
    }
    setLinkModalOpen(false)
  }

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setLinkModalOpen(false)
  }

  return (
    <div className="border border-[#E5DFD3] rounded-2xl bg-white overflow-hidden shadow-xs focus-within:border-[#12372A] transition-all">
      {/* ─── Toolbar ─── */}
      <div className="bg-[#FAF7F2] border-b border-[#E5DFD3] p-2 flex flex-wrap items-center gap-1 text-[#12372A]">
        {/* Headings */}
        <div className="flex items-center gap-0.5 border-l border-[#E5DFD3] pl-1.5 ml-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="عنوان رئيسي (H2)"
          >
            <Heading2 className="w-4 h-4" />
            <span className="hidden sm:inline">H2</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="عنوان فرعي (H3)"
          >
            <Heading3 className="w-4 h-4" />
            <span className="hidden sm:inline">H3</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              editor.isActive('heading', { level: 4 })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="عنوان قسم (H4)"
          >
            <Heading4 className="w-4 h-4" />
            <span className="hidden sm:inline">H4</span>
          </button>
        </div>

        {/* Text Formats */}
        <div className="flex items-center gap-0.5 border-l border-[#E5DFD3] pl-1.5 ml-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('bold') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="خط عريض (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('italic') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="خط مائل (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('underline') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="تسطير (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('strike') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="يتوسطه خط"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('code') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="كود مدمج"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Text Alignments */}
        <div className="flex items-center gap-0.5 border-l border-[#E5DFD3] pl-1.5 ml-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="محاذاة لليمين"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="توسيط"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="محاذاة لليسار"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="ضبط النص (Justify)"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 border-l border-[#E5DFD3] pl-1.5 ml-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('bulletList') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="قائمة نقطية"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('orderedList') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="قائمة رقمية"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('blockquote') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="اقتباس مميز"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded-lg hover:bg-black/5 text-[#12372A] transition-colors cursor-pointer"
            title="خط فاصل"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Insert Image & Link */}
        <div className="flex items-center gap-1 border-l border-[#E5DFD3] pl-1.5 ml-1">
          {/* Image button with highlight */}
          <button
            type="button"
            onClick={() => {
              setImageModalOpen(true)
              setImageTab('upload')
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#12372A] text-[#F3D7A4] hover:bg-[#205341] transition-colors cursor-pointer shadow-xs"
            title="إدراج صورة من الجهاز أو مكتبة الوسائط"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>إدراج صورة</span>
          </button>

          {/* Link button */}
          <button
            type="button"
            onClick={handleOpenLinkModal}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor.isActive('link') ? 'bg-[#12372A] text-[#F3D7A4]' : 'hover:bg-black/5 text-[#12372A]'
            }`}
            title="إدراج / تعديل رابط"
          >
            <Link2 className="w-4 h-4" />
          </button>
        </div>

        {/* Active Image Quick Controls (Resize on click) */}
        {editor.isActive('image') && (
          <div className="flex items-center gap-1 bg-[#12372A]/5 px-2 py-1 rounded-xl border border-[#C5A880]/60 text-[#12372A] animate-fade-in">
            <span className="text-[11px] font-black text-[#12372A] ml-1">حجم الصورة:</span>
            {[
              { label: 'كامل', value: '100%' },
              { label: 'كبير', value: '75%' },
              { label: 'وسط', value: '50%' },
              { label: 'صغير', value: '35%' },
            ].map((size) => {
              const currentW = editor.getAttributes('image').width || '100%'
              const isActive = currentW === size.value
              return (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => editor.chain().focus().updateAttributes('image', { width: size.value }).run()}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-black transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#12372A] text-[#F3D7A4] shadow-xs'
                      : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]'
                  }`}
                >
                  {size.label}
                </button>
              )
            })}
          </div>
        )}

        {/* History / Clear */}
        <div className="flex items-center gap-0.5 mr-auto">
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="p-1.5 rounded-lg hover:bg-black/5 text-[#6b7f74] hover:text-[#12372A] transition-colors cursor-pointer"
            title="إزالة التنسيق"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg hover:bg-black/5 text-[#6b7f74] hover:text-[#12372A] disabled:opacity-30 transition-colors cursor-pointer"
            title="تراجع (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg hover:bg-black/5 text-[#6b7f74] hover:text-[#12372A] disabled:opacity-30 transition-colors cursor-pointer"
            title="إعادة (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── Editor Content Area ─── */}
      <div style={{ minHeight }} className="tiptap-editor-wrap bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* ─── Footer Stats ─── */}
      <div className="px-4 py-2 border-t border-[#E5DFD3] bg-[#FAF7F2] flex items-center justify-between text-[11px] text-[#6b7f74]">
        <div className="flex items-center gap-3 font-mono">
          <span>{editor.storage.characterCount?.words?.() ?? editor.state.doc.textContent.trim().split(/\s+/).filter(Boolean).length} كلمة</span>
          <span>•</span>
          <span>{editor.state.doc.textContent.length} حرف</span>
        </div>
        <div className="text-[#8bbba5] font-medium text-[10px]">
          محرر راية المتكامل • يدعم الوسوم والصور المباشرة
        </div>
      </div>

      {/* ─── Hidden File Input for Device Upload ─── */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ─── Image Insertion Modal ─── */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => !uploading && setImageModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden z-10 border border-[#E5DFD3]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DFD3] bg-[#FAF7F2] shrink-0">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-base font-black text-[#12372A]">إدراج صورة في المقال</h3>
              </div>
              <button
                type="button"
                disabled={uploading}
                onClick={() => setImageModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-[#6b7f74] hover:text-[#12372A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Size Selector inside Modal */}
            <div className="bg-[#FAF7F2] px-6 py-2.5 border-b border-[#E5DFD3] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#12372A]">حجم الصورة داخل المقال:</span>
                <span className="text-[10px] text-[#6b7f74] hidden sm:inline">(يمكنك أيضاً تغييره لاحقاً بالنقر على الصورة)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { label: 'عرض كامل (100%)', value: '100%' },
                  { label: 'كبير (75%)', value: '75%' },
                  { label: 'متوسط (50%)', value: '50%' },
                  { label: 'صغير (35%)', value: '35%' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedImageWidth(opt.value as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedImageWidth === opt.value
                        ? 'bg-[#12372A] text-[#F3D7A4] shadow-xs'
                        : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E5DFD3] bg-white px-6 pt-2 shrink-0">
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  imageTab === 'upload'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>رفع من الجهاز</span>
              </button>
              <button
                type="button"
                onClick={handleOpenMediaLibrary}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  imageTab === 'library'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                <Library className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>مكتبة الوسائط</span>
              </button>
              <button
                type="button"
                onClick={() => setImageTab('url')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  imageTab === 'url'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>رابط خارجي</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Tab 1: Upload from device */}
              {imageTab === 'upload' && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#E5DFD3] rounded-2xl p-8 bg-[#FAF7F2] text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5DFD3] flex items-center justify-center text-[#12372A] shadow-xs mb-4">
                    {uploading ? (
                      <Loader2 className="w-8 h-8 animate-spin text-[#C5A880]" />
                    ) : uploadSuccess ? (
                      <Check className="w-8 h-8 text-emerald-600" />
                    ) : (
                      <Upload className="w-8 h-8 text-[#12372A]" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#12372A] mb-1">
                    {uploading
                      ? 'جاري الرفع إلى التخزين...'
                      : uploadSuccess
                      ? 'تم رفع الصورة وإدراجها بنجاح!'
                      : 'اختر صورة من جهازك'}
                  </h4>
                  <p className="text-xs text-[#6b7f74] max-w-sm mb-5">
                    سيتم حفظ الصورة في مكتبة الوسائط تلقائياً وإدراجها في المقال مباشرةً
                  </p>
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#12372A] text-[#F3D7A4] hover:bg-[#205341] transition-all cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    <Upload className="w-4 h-4" />
                    <span>تصفح واختيار صورة</span>
                  </button>
                </div>
              )}

              {/* Tab 2: Pick from Library */}
              {imageTab === 'library' && (
                <div>
                  {loadingLibrary ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-2 text-[#6b7f74]">
                      <Loader2 className="w-8 h-8 animate-spin text-[#C5A880]" />
                      <span className="text-xs">جاري تحميل مكتبة الصور...</span>
                    </div>
                  ) : mediaItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-2 text-[#6b7f74] text-center">
                      <Library className="w-10 h-10 text-[#C5A880]" />
                      <p className="text-sm font-bold text-[#12372A]">لا توجد صور في المكتبة بعد</p>
                      <p className="text-xs">يمكنك رفع صورة جديدة من تبويب "رفع من الجهاز"</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {mediaItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectMediaItem(item)}
                          className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-[#E5DFD3] hover:border-[#12372A] transition-all cursor-pointer hover:scale-102 bg-[#FAF7F2]"
                        >
                          <img
                            src={item.file_url}
                            alt={item.alt_text || item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-[#12372A]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="bg-white text-[#12372A] text-[10px] font-bold px-2 py-1 rounded-md shadow-xs">
                              إدراج
                            </span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[10px] text-white truncate text-center">{item.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Direct URL */}
              {imageTab === 'url' && (
                <form onSubmit={handleInsertDirectUrl} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                      رابط الصورة المباشر
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/image.jpg"
                      value={directImageUrl}
                      onChange={(e) => setDirectImageUrl(e.target.value)}
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-mono focus:border-[#12372A] focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setImageModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#6b7f74] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={!directImageUrl.trim()}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-[#12372A] text-[#F3D7A4] hover:bg-[#205341] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      إدراج الصورة
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Link Modal ─── */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setLinkModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 border border-[#E5DFD3]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#12372A]">
                <Link2 className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-sm font-black">إدراج رابط تشعبي</h3>
              </div>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="p-1 rounded-lg text-[#6b7f74] hover:text-[#12372A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleApplyLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  رابط الوجهة (URL)
                </label>
                <input
                  type="text"
                  placeholder="https://raya-creative.com أو صفحة محددة"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  dir="ltr"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-mono focus:border-[#12372A] focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                {editor.isActive('link') ? (
                  <button
                    type="button"
                    onClick={handleRemoveLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    <span>إزالة الرابط</span>
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLinkModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#6b7f74] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#12372A] text-[#F3D7A4] hover:bg-[#205341] cursor-pointer shadow-xs"
                  >
                    تطبيق الرابط
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
