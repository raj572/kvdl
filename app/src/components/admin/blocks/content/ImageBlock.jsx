import { Upload, X } from 'lucide-react';
import { useRef } from 'react';
import { getImageUrl } from '../../../../services/api';

const ImageBlock = ({ content, updateContent }) => {
    const fileInputRef = useRef(null);

    // content is actually the entire block object with src, caption, file, isNew at top level
    const block = content;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('ImageBlock - File selected:', file);
            console.log('File type:', file.type);
            console.log('File size:', file.size);
            // In a real app, we might upload here immediately to get a URL,
            // or store the file object to be uploaded on save.
            // For now, let's assume we pass the File object up, and the parent handles upload, 
            // OR we create a local preview URL.
            // Ideally, the unified 'updateBlog' logic should handle new files.
            // Let's store a local preview and the file object.
            const previewUrl = URL.createObjectURL(file);
            updateContent({
                ...block,
                src: previewUrl,
                file: file, // Store file for upload later
                isNew: true
            });
        }
    };

    const handleRemove = () => {
        updateContent({ ...block, src: '', file: null, caption: '' });
    };

    return (
        <div className="w-full">
            {block.src ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-200">
                    <img
                        src={block.isNew ? block.src : getImageUrl(block.src)}
                        alt="Block Preview"
                        className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={16} />
                    </button>
                    <input
                        type="text"
                        placeholder="Add a caption..."
                        value={block.caption || ''}
                        onChange={(e) => updateContent({ ...block, caption: e.target.value })}
                        className="w-full p-2 text-center text-sm text-gray-500 bg-gray-50 border-t border-gray-100 outline-none"
                    />
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <Upload className="mb-2 text-gray-400" size={24} />
                    <span className="text-gray-500 text-sm">Click to upload an image</span>
                </div>
            )}
        </div>
    );
};

export default ImageBlock;
