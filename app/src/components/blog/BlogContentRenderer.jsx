import { getImageUrl } from '../../services/api';

const BlogContentRenderer = ({ content }) => {
    let blocks = [];

    // Parse content
    if (typeof content === 'string') {
        try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                blocks = parsed;
            } else {
                // Not an array, treat as legacy HTML
                return <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: content }} />;
            }
        } catch (e) {
            // JSON parse failed, treat as legacy HTML
            return <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: content }} />;
        }
    } else if (Array.isArray(content)) {
        blocks = content;
    }

    return (
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'heading':
                        const HeadingTag = `h${block.level || 2}`;
                        return (
                            <HeadingTag key={block.id} className="font-bold text-gray-900 mt-8 mb-4">
                                {block.content}
                            </HeadingTag>
                        );

                    case 'text':
                        return (
                            <div
                                key={block.id}
                                className="rich-text mb-4"
                                dangerouslySetInnerHTML={{ __html: block.content }}
                            />
                        );

                    case 'image':
                        // Support both structures: top-level (correct) and nested in content (legacy)
                        // Correct structure: { type: 'image', src: '...', caption: '...' }
                        // Legacy structure: { type: 'image', content: { src: '...', caption: '...' } }
                        const imageSrc = block.src || block.content?.src;
                        const imageCaption = block.caption || block.content?.caption;

                        return (
                            <figure key={block.id} className="my-10 mx-auto max-w-3xl">
                                <div className="rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                        src={getImageUrl(imageSrc)}
                                        alt={imageCaption || 'Blog Image'}
                                        className="w-full h-auto object-contain"
                                        style={{ maxHeight: '600px' }}
                                    />
                                </div>
                                {imageCaption && (
                                    <figcaption className="text-center text-sm text-gray-600 mt-4 italic px-4">
                                        {imageCaption}
                                    </figcaption>
                                )}
                            </figure>
                        );

                    case 'video':
                        const isYoutube = block.provider === 'youtube';
                        const isInstagram = block.provider === 'instagram';

                        const getInstagramEmbedUrl = (url) => {
                            const cleanUrl = url.split('?')[0];
                            if (cleanUrl.endsWith('/embed') || cleanUrl.endsWith('/embed/')) {
                                return cleanUrl;
                            }
                            return `${cleanUrl}/embed`;
                        };

                        return (
                            <div key={block.id} className={`rounded-2xl overflow-hidden w-full my-10 bg-black/5 shadow-xl ${isInstagram ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video max-w-3xl mx-auto'}`}>
                                {isYoutube ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={block.src.replace('watch?v=', 'embed/').split('&')[0]}
                                        title="YouTube video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : isInstagram ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={getInstagramEmbedUrl(block.src)}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                        src={getImageUrl(block.src)}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default BlogContentRenderer;
