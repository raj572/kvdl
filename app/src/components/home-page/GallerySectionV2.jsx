import { Link } from "react-router-dom";

const GallerySectionV2 = () => {
    // Split images into two rows
    const row1Images = [1, 2, 3, 4, 5, 6, 7, 8];
    const row2Images = [9, 10, 11, 12, 13, 14, 15, 16];

    // Marquee Component
    const MarqueeRow = ({ images, className }) => (
        <div className="relative flex overflow-hidden w-full h-[50vh] bg-black">
            <div className={`flex items-center min-w-full gap-0 ${className}`} style={{ willChange: 'transform' }}>
                {/* 1st Loop */}
                {images.map((id) => (
                    <div key={`orig-${id}`} className="min-w-[50vw] sm:min-w-[33vw] md:min-w-[25vw] lg:min-w-[20vw] h-full border-r border-white/5 relative group">
                        <img
                            src={`/images/${id}.png`}
                            alt={`Gallery ${id}`}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 filter"
                            loading="lazy"
                        />
                    </div>
                ))}
                {/* 2nd Loop */}
                {images.map((id) => (
                    <div key={`dup-${id}`} className="min-w-[50vw] sm:min-w-[33vw] md:min-w-[25vw] lg:min-w-[20vw] h-full border-r border-white/5 relative group">
                        <img
                            src={`/images/${id}.png`}
                            alt={`Gallery ${id}`}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 filter"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

            {/* Row 1: Left to Right */}
            {/* We use animate-marquee-reverse for L -> R */}
            <MarqueeRow
                images={row1Images}
                className="animate-marquee-reverse" // Defined in index.css
            />

            {/* Row 2: Right to Left */}
            {/* We use animate-marquee for R -> L */}
            <MarqueeRow
                images={row2Images}
                className="animate-marquee"
            />

            {/* Centered Overlay Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 text-center rounded-3xl pointer-events-auto border border-white/10 shadow-2xl transform transition-transform hover:scale-105 duration-500">
                    <h1 className="text-3xl lg:text-6xl tracking-tighter uppercase font-semibold text-white font-[arkhip] mb-6 leading-tight drop-shadow-lg">
                        See More Places <br /> Like This
                    </h1>
                    <Link
                        to="/gallery"
                        className="inline-block bg-primary hover:bg-white hover:text-primary transition-all duration-300 px-8 py-3 text-white font-[sansation] font-bold tracking-wide border border-transparent rounded-full shadow-lg transform hover:-translate-y-1"
                    >
                        Explore Our Gallery
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default GallerySectionV2;
