import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import BackButton from "../components/common/BackButton";
import TextScroll from "../components/common/TextScroll";
import { galleryImages } from "../data/galleryImages";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    // animate each image when it enters viewport
    ScrollTrigger.batch(".gallery-item", {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });
  });

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="gallery-page min-h-dvh">
      {/* STICKY TOP SECTION */}
      <div className="sticky top-0 z-10 w-full ">
        <TextScroll
          text="Gallery"
          repeat={24}
          duration={100}
          className="pt-20 pb-4 text-2xl md:pt-28 md:pb-6 md:text-4xl lg:text-5xl bg-background border-y border-foreground"
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="gallery-hero min-h-dvh bg-background relative z-20 px-4 py-10">
        <div className="container mx-auto flex flex-col gap-6">
          <BackButton />
          {/* Projects Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 min-h-[50vh] pt-2">
            {galleryImages
              .filter((img) => img.category === "Completed")
              .map((image, i) => (
                <div
                  key={`Completed-${i}`}
                  className="gallery-item relative overflow-hidden rounded-xl break-inside-avoid group cursor-pointer opacity-0 translate-y-10"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.src}
                    alt={image.description}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                    <div>
                      <h3 className="text-white text-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {image.description}
                      </h3>
                      <span className="text-primary text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 inline-block mt-1">
                        Completed Project
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors p-2 z-50 rounded-full bg-black/20 hover:bg-black/40"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-7xl max-h-screen w-full flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.description}
              className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white">{selectedImage.description}</h3>
              <p className="text-gray-300 mt-1">
                {selectedImage.category === 'Completed' ? 'Completed Project' : 'Ongoing Project'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
