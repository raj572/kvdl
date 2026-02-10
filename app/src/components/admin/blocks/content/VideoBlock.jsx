import { Video, X, Youtube } from 'lucide-react';
import { useRef } from 'react';
import { getImageUrl } from '../../../../services/api';

const VideoBlock = ({ content, updateContent }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            updateContent({
                ...content,
                src: previewUrl,
                file: file,
                provider: 'upload',
                isNew: true
            });
        }
    };

    const handleUrlChange = (url) => {
        let provider = 'youtube';
        if (url.includes('instagram.com')) {
            provider = 'instagram';
        }

        updateContent({
            ...content,
            src: url,
            provider: provider
        });
    };

    const handleRemove = () => {
        updateContent({ ...content, src: '', file: null, provider: null });
    };

    const isYoutube = content?.provider === 'youtube';
    const isInstagram = content?.provider === 'instagram';

    const getInstagramEmbedUrl = (url) => {
        // Ensure URL ends with /embed
        const cleanUrl = url.split('?')[0];
        if (cleanUrl.endsWith('/embed') || cleanUrl.endsWith('/embed/')) {
            return cleanUrl;
        }
        return `${cleanUrl}/embed`;
    }

    return (
        <div className="w-full">
            {content?.src ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-200">
                    <div className={`w-full bg-black/5 ${isInstagram ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video'}`}>
                        {isYoutube ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={content.src.replace('watch?v=', 'embed/').split('&')[0]}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : isInstagram ? (
                            <iframe
                                className="w-full h-full"
                                src={getInstagramEmbedUrl(content.src)}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <video
                                controls
                                className="w-full h-full object-cover"
                                src={content.isNew ? content.src : getImageUrl(content.src)}
                            />
                        )}
                    </div>

                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex gap-4">
                    {/* Upload Option */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="video/*"
                        />
                        <Video className="mb-2 text-gray-400" size={24} />
                        <span className="text-gray-500 text-sm">Upload Video</span>
                    </div>

                    {/* YouTube/Instagram Option */}
                    <div className="flex-1 border border-gray-200 rounded-xl p-6 flex flex-col justify-center bg-gray-50/50">
                        <div className="flex items-center gap-2 mb-3 text-gray-600">
                            <Youtube size={20} />
                            <span className="text-sm font-medium">Video URL</span>
                        </div>
                        <input
                            type="text"
                            placeholder="YouTube or Instagram URL..."
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-1 focus:ring-black outline-none"
                            onBlur={(e) => {
                                if (e.target.value) handleUrlChange(e.target.value);
                            }}
                        />
                        <p className="text-[10px] text-gray-400 mt-2">Supports YouTube and Instagram Reels/Posts</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoBlock;
