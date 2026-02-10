import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    const buttons = [
        {
            label: 'B',
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            title: 'Bold',
            className: 'font-bold'
        },
        {
            label: 'I',
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            title: 'Italic',
            className: 'italic'
        },
        {
            label: 'U',
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline'),
            title: 'Underline',
            className: 'underline'
        },
        {
            label: 'H2',
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2',
            className: 'font-bold text-lg'
        },
        {
            label: 'List',
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
            title: 'Bullet List',
            className: ''
        },
        {
            label: 'Ordered',
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
            title: 'Ordered List',
            className: ''
        }
    ]

    return (
        <div className="flex flex-wrap gap-2 p-3 border-b border-foreground/10 bg-foreground/5">
            {buttons.map((btn, index) => (
                <button
                    key={index}
                    onClick={(e) => { e.preventDefault(); btn.action() }}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                    className={`
            w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all
            ${btn.isActive
                            ? 'bg-primary text-white shadow-md'
                            : 'text-foreground hover:bg-foreground/10'
                        }
            ${btn.className}
          `}
                    title={btn.title}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    )
}

const TiptapEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[200px] max-w-none p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    // Update content if value changes externally (e.g. form reset)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    return (
        <div className="w-full rounded-xl border border-foreground/10 bg-background/50 overflow-hidden focus-within:border-primary transition-colors">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor
