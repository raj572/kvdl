import { Link, Upload, X } from "lucide-react";
import { useState } from "react";
import { uploadBlogMedia } from "../../services/api";

const MediaUploader = ({ isOpen, onClose, onInsert, initialType = 'image' }) => {
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'link'
    const [url, setUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file);
    };

    const handleFileUpload = async (file) => {
        setError(null);
        setUploading(true);

        try {
            // Check file type
            const isVideo = file.type.startsWith('video/');
            const isImage = file.type.startsWith('image/');

            if (!isImage && !isVideo) {
                throw new Error('Please upload an image or video file.');
            }

            const response = await uploadBlogMedia(file);
            if (response.success) {
                onInsert(response.url, isVideo ? 'video' : 'image');
                onClose();
            } else {
                throw new Error(response.message || 'Upload failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleUrlInsert = () => {
        if (!url) return;

        let type = 'image';
        if (url.includes('youtube.com') || url.includes('youtu.be')) type = 'youtube';
        else if (url.match(/\.(mp4|webm|ogg)$/i)) type = 'video';

        onInsert(url, type);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-6 font-[arkhip]">Insert Media</h2>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'upload' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                    >
                        Upload
                    </button>
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'link' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                    >
                        By URL
                    </button>
                </div>

                {/* Upload Tab */}
                {activeTab === 'upload' && (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                    >
                        {uploading ? (
                            <div className="py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-sm font-bold text-gray-500">Uploading media...</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                    <Upload size={24} />
                                </div>
                                <p className="text-sm font-bold text-gray-700 mb-2">
                                    Drag & Drop or <span className="text-primary cursor-pointer" onClick={() => document.getElementById('mediaInput').click()}>Browse</span>
                                </p>
                                <p className="text-xs text-gray-400">
                                    Supports JPG, PNG, GIF, MP4, WebM
                                </p>
                                <input
                                    id="mediaInput"
                                    type="file"
                                    accept="image/*,video/*"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </>
                        )}
                    </div>
                )}

                {/* URL Tab */}
                {activeTab === 'link' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <Link size={16} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Paste image or video URL..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="bg-transparent w-full text-sm font-medium outline-none"
                                autoFocus
                            />
                        </div>
                        <p className="text-xs text-gray-400">
                            Supports generic image URLs, direct video links (mp4), and YouTube links.
                        </p>
                        <button
                            onClick={handleUrlInsert}
                            disabled={!url}
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Insert Media
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 flex items-center gap-2">
                        <X size={14} /> {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaUploader;
