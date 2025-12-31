import React from 'react'
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaSnapchatGhost, 
  FaTiktok, 
  FaTwitter 
} from "react-icons/fa";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {

  useGSAP(() => {
    gsap.fromTo(
      ".contact-image",
      { y: "-25vh" },
      {
        y: "25vh",
        scrollTrigger: {
          trigger: ".contact-container",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="contact-container relative h-screen w-full overflow-hidden bg-black">

      {/* PARALLAX IMAGE */}
      <img
        src="/images/9.png"
        alt=""
        className="contact-image h-full w-full object-cover scale-[1.5] will-change-transform"
      />

      {/* RESPONSIVE INFO CARD */}
      <div
        className="
          absolute 
          left-[5%]
          top-1/2 
          -translate-y-1/2
          w-[90%]
          max-w-sm
          bg-white
          text-foreground
          p-5
          rounded-xl
          space-y-5
          shadow-xl

          sm:left-[10%]
          sm:w-full
          sm:max-w-sm
          sm:p-6
          sm:rounded-lg
          sm:space-y-6
        "
      >
        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-noto font-semibold">
          Schedule a Property Visit
        </h2>

        {/* Hotline */}
        <div className="bg-gray-100 p-3 sm:p-4 rounded-xl flex items-start gap-3">
          <FaPhoneAlt className="text-base sm:text-lg mt-1" />
          <div>
            <p className="text-sm font-semibold">Hotline:</p>
            <p className="text-xs sm:text-sm opacity-80">+971 56 498 3456</p>
          </div>
        </div>

        {/* SMS / WhatsApp */}
        <div className="bg-gray-100 p-3 sm:p-4 rounded-xl flex items-start gap-3">
          <FaPhoneAlt className="text-base sm:text-lg mt-1" />
          <div>
            <p className="text-sm font-semibold">SMS / Whatsapp</p>
            <p className="text-xs sm:text-sm opacity-80">+971 55 343 6433</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-gray-100 p-3 sm:p-4 rounded-xl flex items-start gap-3">
          <FaEnvelope className="text-base sm:text-lg mt-1" />
          <div>
            <p className="text-sm font-semibold">Email:</p>
            <p className="text-xs sm:text-sm opacity-80">support@zalomi.com</p>
          </div>
        </div>

        {/* Button */}
        <Link to="/contact" className="bg-primary hover:bg-red-700 duration-300 transition-all px-4 py-2 sm:px-5 sm:py-3 text-background font-[sansation] text-sm sm:text-base flex items-center justify-center border border-background cursor-pointer rounded-full">
          Contact Us
        </Link>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3 sm:pt-4" />

        {/* Social Icons */}
        <p className="text-sm font-semibold">Connect with us</p>
        <div className="flex items-center gap-4 sm:gap-5 text-lg sm:text-xl">
          <FaFacebookF />
          <FaInstagram />
          <FaSnapchatGhost />
          <FaTiktok />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
};

export default Contact;
