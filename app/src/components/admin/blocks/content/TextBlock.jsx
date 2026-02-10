import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Unlink } from 'lucide-react';
import { useEffect } from 'react';

const TextBlock = ({ content, updateContent }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BubbleMenuExtension,
            LinkExtension.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing...',
                showOnlyWhenEditable: true,
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            updateContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[60px] p-4 rounded-xl border border-transparent hover:border-gray-200 focus:border-black/20 bg-gray-50/50 transition-all placeholder:text-gray-400'
            }
        }
    });

    // Sync content if it changes externally
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            if (content === '' && editor.getText() === '') return;
            // editor.commands.setContent(content); 
        }
    }, [content, editor]);

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="text-block-editor [&_.is-editor-empty]:text-gray-400 [&_.is-empty::before]:content-[attr(data-placeholder)] [&_.is-empty::before]:float-left [&_.is-empty::before]:text-gray-400 [&_.is-empty::before]:pointer-events-none [&_.is-empty::before]:h-0 relative">
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex bg-black text-white rounded-lg shadow-xl overflow-hidden divide-x divide-white/20">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('bold') ? 'bg-white/20' : ''}`}
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('italic') ? 'bg-white/20' : ''}`}
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={setLink}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('link') ? 'bg-white/20' : ''}`}
                    >
                        <LinkIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                        className="p-2 hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                        <Unlink size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('bulletList') ? 'bg-white/20' : ''}`}
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 hover:bg-white/20 transition-colors ${editor.isActive('orderedList') ? 'bg-white/20' : ''}`}
                    >
                        <ListOrdered size={16} />
                    </button>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TextBlock;
