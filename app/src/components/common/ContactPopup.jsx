import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show after 15 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full relative overflow-hidden animate-fade-in-up border border-gray-100 font-[sansation]">

                {/* Close Button */}
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1"
                >
                    <FaTimes size={20} />
                </button>

                <div className="p-8 pt-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <img src="/images/kedarlogo.webp" alt="KVDL" className="h-16 mx-auto mb-4 object-contain" />
                        <h2 className="text-xl font-bold text-gray-800 tracking-wide font-[arkhip] uppercase">Welcome</h2>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            Discover premium living with Kedar Vanjape Developers. How can we assist you today?
                        </p>
                    </div>

                    {/* Contact Details Grid */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-primary/20 transition-colors group">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <FaPhoneAlt size={14} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Call Us</p>
                                <a href="tel:+971564983456" className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">
                                    +971 56 498 3456
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-primary/20 transition-colors group">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <FaEnvelope size={14} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email Us</p>
                                <a href="mailto:support@zalomi.com" className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">
                                    support@zalomi.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <a
                            href="https://api.whatsapp.com/send/?phone=8605558833&text=Hello%2C+I+am+interested+in+kedar+Vanjape+Developers+Projects.&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closePopup}
                            className="flex items-center justify-center gap-2 w-full py-3 px-6 text-white bg-[#25D366] hover:bg-[#128C7E] rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                        >
                            <FaWhatsapp size={18} />
                            Chat on WhatsApp
                        </a>

                        <Link
                            to="/contact"
                            onClick={closePopup}
                            className="block w-full py-3 px-6 text-center text-gray-600 hover:text-primary bg-transparent text-sm font-semibold hover:underline"
                        >
                            View Contact Page
                        </Link>

                        <Link
                            to="/admin/login"
                            onClick={closePopup}
                            className="block w-full text-center text-xs text-gray-300 hover:text-gray-500 transition-colors mt-2"
                        >
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;
