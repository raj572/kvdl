import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, Node, mergeAttributes, useEditor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import {
    AlignCenter,
    AlignLeft,
    Bold,
    Heading1, Heading2,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List, ListOrdered, Quote,
    Underline as UnderlineIcon
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { API_BASE_URL, uploadBlogMedia } from '../../services/api'
import MediaUploader from './MediaUploader'

// Custom Video Extension
const Video = Node.create({
    name: 'video',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'video',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes(HTMLAttributes, { controls: true, class: 'w-full aspect-video rounded-xl shadow-lg my-4' })]
    },

    addNodeView() {
        return ({ node }) => {
            const video = document.createElement('video')
            video.src = node.attrs.src
            video.controls = true
            video.className = 'w-full aspect-video rounded-xl shadow-lg my-4 bg-black'
            return {
                dom: video,
            }
        }
    },
})

const TiptapEditor = ({ content, onChange, onCharacterCountChange }) => {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-xl shadow-lg max-w-full my-4 border border-black/5',
                },
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
                HTMLAttributes: {
                    class: 'w-full aspect-video rounded-xl shadow-lg my-4',
                },
            }),
            Video, // Add Custom Video Extension
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    return 'Start writing your story...'
                },
            }),
            CharacterCount,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-2 [&_p]:my-3 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-black/60',
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                    const file = event.dataTransfer.files[0];
                    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                        // Upload directly on drop
                        uploadBlogMedia(file).then(response => {
                            if (response.success && response.url) {
                                const { schema } = view.state;
                                const fullUrl = response.url.startsWith('http') ? response.url : `${API_BASE_URL}${response.url}`;

                                let node;
                                if (file.type.startsWith('video/')) {
                                    node = schema.nodes.video.create({ src: fullUrl });
                                } else {
                                    node = schema.nodes.image.create({ src: fullUrl });
                                }

                                const transaction = view.state.tr.replaceSelectionWith(node);
                                view.dispatch(transaction);
                            }
                        }).catch(err => console.error("Drop upload failed", err));

                        return true;
                    }
                }
                return false;
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
            if (onCharacterCountChange) {
                onCharacterCountChange(editor.storage.characterCount.words());
            }
        },
    })

    // Sync external content changes
    useEffect(() => {
        if (editor && content && content !== editor.getHTML()) {
            if (editor.isEmpty && content) {
                editor.commands.setContent(content)
            }
        }
    }, [content, editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) return
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    const handleMediaInsert = (url, type) => {
        // Ensure URL is absolute/full if relative
        const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

        if (type === 'youtube') {
            editor.commands.setYoutubeVideo({ src: fullUrl });
        } else if (type === 'video') {
            editor.commands.insertContent(`<video src="${fullUrl}" controls class="w-full aspect-video rounded-xl shadow-lg my-4"></video>`);
        } else {
            editor.chain().focus().setImage({ src: fullUrl }).run();
        }
    };

    if (!editor) {
        return null
    }

    return (
        <div className="relative w-full">
            {/* Media Uploader Modal */}
            <MediaUploader
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onInsert={handleMediaInsert}
            />

            {/* 1. Bubble Menu (Floating on selection) */}
            {editor && (
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100 }}
                    className="flex bg-black text-white rounded-xl shadow-xl overflow-hidden divide-x divide-white/20 border border-white/10"
                >
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('bold') ? 'bg-primary text-white' : ''}`}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('italic') ? 'bg-primary text-white' : ''}`}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('underline') ? 'bg-primary text-white' : ''}`}
                        title="Underline"
                    >
                        <UnderlineIcon size={16} />
                    </button>
                    <button
                        onClick={setLink}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('link') ? 'bg-primary text-white' : ''}`}
                        title="Link"
                    >
                        <LinkIcon size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-white' : ''}`}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-white' : ''}`}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : ''}`}
                        title="H2"
                    >
                        <Heading2 size={16} />
                    </button>
                </BubbleMenu>
            )}

            {/* 2. Floating Menu (Appears on empty line) */}
            {editor && (
                <FloatingMenu
                    editor={editor}
                    tippyOptions={{ duration: 100 }}
                    className="flex bg-white text-black border border-black/10 rounded-xl shadow-xl overflow-hidden gap-1 p-1"
                >
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        <Heading1 size={14} /> Heading 1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        <Heading2 size={14} /> Heading 2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Bullet List"
                    >
                        <List size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Ordered List"
                    >
                        <ListOrdered size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Quote"
                    >
                        <Quote size={16} />
                    </button>
                    <div className="w-px bg-black/10 mx-1"></div>
                    <button
                        onClick={() => setIsMediaModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        <ImageIcon size={14} /> Media
                    </button>
                </FloatingMenu>
            )}

            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor
