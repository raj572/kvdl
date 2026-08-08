import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CSRCarousel = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);

    const totalImages = images.length;
    const imagesPerView = {
        mobile: 1,
        tablet: 2,
        desktop: 3
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                nextSlide();
            }, 3000);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, currentIndex]);

    // Pause on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // GSAP animation for slide transition
    useEffect(() => {
        if (carouselRef.current) {
            gsap.fromTo(
                carouselRef.current.children,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
        }
    }, [currentIndex]);

    const getVisibleImages = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % totalImages;
            visible.push({ ...images[index], index });
        }
        return visible;
    };

    return (
        <div
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-2xl">
                <div
                    ref={carouselRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    {getVisibleImages().map((image, idx) => (
                        <div
                            key={`${image.index}-${idx}`}
                            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 md:h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-medium">{image.alt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-foreground text-background p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="size-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-foreground text-background p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="size-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 bg-foreground'
                                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CSRCarousel;
