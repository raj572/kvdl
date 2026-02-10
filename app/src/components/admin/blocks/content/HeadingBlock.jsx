
const HeadingBlock = ({ content, updateContent, level = 2 }) => {
    return (
        <input
            type="text"
            value={content}
            onChange={(e) => updateContent(e.target.value)}
            className={`w-full bg-transparent border-none outline-none font-bold text-gray-900 placeholder-gray-300 focus:ring-0 ${level === 1 ? 'text-4xl' : level === 2 ? 'text-3xl' : 'text-2xl'
                }`}
            placeholder={`Heading ${level}`}
        />
    );
};

export default HeadingBlock;
