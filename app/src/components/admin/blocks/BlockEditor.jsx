import { Reorder } from 'framer-motion';
import { Heading1, Image as ImageIcon, Type, Video } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import BlockWrapper from './BlockWrapper';

const BlockEditor = ({ blocks, setBlocks }) => {

    const addBlock = (type) => {
        const newBlock = {
            id: uuidv4(),
            type: type,
            content: '',
            // Add default props based on type
            ...(type === 'heading' ? { level: 2 } : {}),
            ...(type === 'image' ? { src: '', caption: '' } : {}),
            ...(type === 'video' ? { src: '', provider: null } : {}),
        };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (updatedBlock) => {
        setBlocks(blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b)));
    };

    const removeBlock = (id) => {
        setBlocks(blocks.filter((b) => b.id !== id));
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks}>
                {blocks.map((block) => (
                    <BlockWrapper
                        key={block.id}
                        block={block}
                        updateBlock={updateBlock}
                        removeBlock={removeBlock}
                    />
                ))}
            </Reorder.Group>

            {/* Add Block Controls */}
            <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Add Content Block</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => addBlock('heading')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-black transition-all text-sm font-medium text-gray-700"
                    >
                        <Heading1 size={18} /> Heading
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock('text')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-black transition-all text-sm font-medium text-gray-700"
                    >
                        <Type size={18} /> Text Paragraph
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock('image')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-black transition-all text-sm font-medium text-gray-700"
                    >
                        <ImageIcon size={18} /> Image
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock('video')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-black transition-all text-sm font-medium text-gray-700"
                    >
                        <Video size={18} /> Video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockEditor;
