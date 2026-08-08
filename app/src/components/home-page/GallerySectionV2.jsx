import { Link } from "react-router-dom";

const GallerySectionV2 = () => {
    const row1Images = [1, 2, 3, 4, 5, 6, 7, 8];
    const row2Images = [9, 10, 11, 12, 13, 14, 15, 16];

    const MarqueeRow = ({ images, className }) => (
        <div className="relative flex overflow-hidden w-full h-[50vh] bg-black">
            <div
                className={`flex items-center min-w-full gap-0 ${className}`}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            >
                {/* 1st set */}
                {[...images, ...images].map((id, idx) => (
                    <div
                        key={idx}
                        className="min-w-[50vw] sm:min-w-[33vw] md:min-w-[25vw] lg:min-w-[20vw] h-full relative group overflow-hidden border-r border-white/5"
                    >
                        <img
                            src={`/images/${id}.webp`}
                            alt={`Gallery ${id}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        {/* Dark overlay fades out on hover — far cheaper than grayscale filter */}
                        <div className="absolute inset-0 bg-black/55 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

            {/* Row 1: Right to Left (reverse) */}
            <MarqueeRow images={row1Images} className="animate-marquee-reverse" />

            {/* Row 2: Left to Right */}
            <MarqueeRow images={row2Images} className="animate-marquee" />

            {/* Centered Overlay Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="bg-black/50 p-8 md:p-12 text-center rounded-2xl pointer-events-auto border border-white/10 shadow-2xl">
                    <h2 className="text-3xl lg:text-6xl tracking-tighter uppercase font-semibold text-white font-[arkhip] mb-6 leading-tight drop-shadow-lg">
                        See More Places <br /> Like This
                    </h2>
                    <Link
                        to="/gallery"
                        className="inline-block bg-primary hover:bg-white hover:text-primary transition-colors duration-300 px-8 py-3 text-white font-[sansation] font-bold tracking-wide border border-transparent rounded-full shadow-lg"
                    >
                        Explore Our Gallery
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default GallerySectionV2;

