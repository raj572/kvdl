
import { useState } from 'react';

const MapSection = () => {
    const [isInteractive, setIsInteractive] = useState(false);

    return (
        <div
            className="w-full h-[400px] md:h-[500px] bg-gray-100 relative z-10 group"
            onMouseLeave={() => setIsInteractive(false)}
            onClick={() => setIsInteractive(true)}
        >
            {/* Overlay to intercept initial scrolls/hovers */}
            <div
                className={`absolute inset-0 z-20 flex items-center justify-center bg-black/10 transition-opacity duration-300 pointer-events-auto cursor-pointer ${isInteractive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                title="Click to interact with map"
            >
                {!isInteractive && (
                    <span className="bg-white/90 px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                        Click to interact
                    </span>
                )}
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.186638596658!2d73.8408866759932!3d18.52394148257008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f38b91483%3A0x1369121854b2cd6!2sKedar%20Vanjape%20Developers!5e0!3m2!1sen!2sin!4v1708100000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: isInteractive ? 'all' : 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`w-full h-full transition-all duration-500 ${isInteractive ? 'grayscale-0' : 'grayscale'}`}
                title="Kedar Vanjape Developers Location"
            ></iframe>
        </div>
    );
};

export default MapSection;
