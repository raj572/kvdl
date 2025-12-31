import { useEffect } from 'react';
import ContactForm from '../components/common/ContactForm';
import TextScroll from '../components/common/TextScroll';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      details: ['+91 98765 43210', '+91 98765 43211'],
      link: 'tel:+919876543210'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      details: ['info@kvdl.com', 'sales@kvdl.com'],
      link: 'mailto:info@kvdl.com'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Office',
      details: ['Pune, Maharashtra', 'India - 411001'],
      link: '#map'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 7:00 PM', 'Sunday: Closed'],
      link: null
    }
  ];

  return (
    <div className="contact-page min-h-dvh">

      {/* STICKY TOP SECTION */}
      <div className="sticky top-0 z-10 w-full">
        <TextScroll
          text="Connect"
          repeat={6}
          duration={100}
          className='pt-24 text-5xl md:pt-40 md:text-7xl lg:text-9xl'
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="contact-hero min-h-dvh bg-background relative z-20">

        {/* INTRO SECTION */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[arkhip] uppercase mb-4 sm:mb-6">
              Get In Touch
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed px-2">
              Have questions about our properties or want to schedule a visit?
              We're here to help you find your dream home. Reach out to us and
              our team will get back to you shortly.
            </p>
          </div>
        </div>

        {/* CONTACT INFO CARDS */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group p-5 sm:p-6 bg-foreground text-background rounded-2xl border-2 border-foreground hover:bg-background hover:text-foreground transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
                onClick={() => info.link && window.location.href !== info.link && (window.location.href = info.link)}
              >
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-primary rounded-full group-hover:bg-primary/90 transition-colors duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-[arkhip] uppercase">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-xs sm:text-sm md:text-base opacity-80">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT FORM SECTION */}
        <div className="bg-foreground text-background py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[arkhip] uppercase mb-3 sm:mb-4">
                Send Us A Message
              </h2>
              <p className="text-sm sm:text-base md:text-lg opacity-80">
                Fill out the form below and we'll respond within 24 hours
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* MAP SECTION */}
        <div id="map" className="py-8 sm:py-10 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[arkhip] uppercase mb-6 sm:mb-8 text-center">
              Visit Our Office
            </h2>

            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0267712!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KVDL Office Location"
                className="w-full sm:h-[350px] md:h-[450px]"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA SECTION */}
        <div className="py-12 sm:py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-[arkhip] uppercase mb-6 sm:mb-8">
              Follow Us On Social Media
            </h3>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
              <a
                href="#"
                className="p-3 sm:p-4 bg-foreground text-background rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-3 sm:p-4 bg-foreground text-background rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-3 sm:p-4 bg-foreground text-background rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-3 sm:p-4 bg-foreground text-background rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ContactPage