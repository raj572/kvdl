import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical, X } from 'lucide-react';
import HeadingBlock from './content/HeadingBlock';
import ImageBlock from './content/ImageBlock';
import TextBlock from './content/TextBlock';
import VideoBlock from './content/VideoBlock';

const BlockWrapper = ({ block, updateBlock, removeBlock, addBlockAfter }) => {
    const dragControls = useDragControls();

    const renderContent = () => {
        switch (block.type) {
            case 'heading':
                return <HeadingBlock content={block.content} updateContent={(content) => updateBlock({ ...block, content })} level={block.level} />;
            case 'text':
                return <TextBlock content={block.content} updateContent={(content) => updateBlock({ ...block, content })} />;
            case 'image':
                return <ImageBlock content={block} updateContent={(newBlock) => updateBlock(newBlock)} />;
            case 'video':
                return <VideoBlock content={block} updateContent={(newBlock) => updateBlock(newBlock)} />;
            default:
                return <div className="p-4 bg-red-50 text-red-500">Unknown block type: {block.type}</div>;
        }
    };

    return (
        <Reorder.Item
            value={block}
            id={block.id}
            dragListener={false}
            dragControls={dragControls}
            className="relative group mb-4"
        >
            <div className="flex items-start gap-2">
                {/* Drag Handle */}
                <div
                    className="mt-2 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <GripVertical size={20} />
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => removeBlock(block.id)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                        title="Remove block"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Add Button Below - Visible on Hover of bottom area or always small? 
          Let's keep it simple: generic add button at bottom of editor, 
          OR hover effect to add in between. 
          For now, rely on main "Add" buttons at bottom, but maybe a small "+" line in between?
      */}
        </Reorder.Item>
    );
};

export default BlockWrapper;
