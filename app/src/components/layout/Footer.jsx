import { Link } from 'react-router-dom';

const Footer = () => {
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  const quickLinks = [
    { name: "Careers", path: "/careers" },
    { name: "FAQs", path: "/faqs" },
    { name: "Admin Login", path: "/admin/login" }
  ];

  const contactInfo = {
    phone: "+91 98765 43210",
    email: "info@kvdl.com",
    address: "302, 3rd floor, CTS.No. 1201/7, Arc Maestro, Near Hotel Rajwadi Gourav, Shivajinagar, Pune – 411004"
  };

  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/share/1DkqhR97Y7/", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { name: "Instagram", url: "https://www.instagram.com/kedarvanjape?igsh=MTY4MDltNW4yamh4ZA==", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { name: "YouTube", url: "https://youtube.com/@kedarvanjapedevelopers6322?si=Uy5VZxnMe52tpNzD", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" }
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <footer className="w-full bg-foreground text-background pt-12 sm:pt-16 pb-6 font-[sansation]">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* COMPANY INFO */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight mb-4 font-[arkhip]">
              More than homes<br />
              We create Lifestyles<span className="text-primary">.</span>
            </h2>
            <p className="text-background/70 text-sm mb-6 leading-relaxed">
              Building premium real estate that transforms the way you live.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="inline-block px-6 py-2 bg-primary text-background border border-background rounded-full cursor-pointer hover:bg-red-700 transition duration-300"
              >
                Get in Touch
              </a>
              <a
                href="/careers"
                onClick={(e) => handleNavClick(e, '/careers')}
                className="inline-block px-6 py-2 bg-transparent text-background border border-background rounded-full cursor-pointer hover:bg-background hover:text-foreground transition duration-300"
              >
                Careers
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-[arkhip] uppercase tracking-wider">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="text-background/70 hover:text-primary transition-colors duration-300 inline-block cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-[arkhip] uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="text-background/70 hover:text-primary transition-colors duration-300 inline-block cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-[arkhip] uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <a
                href={`tel:${contactInfo.phone}`}
                className="hover:text-primary transition-colors duration-300 flex items-start gap-2"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-primary transition-colors duration-300 flex items-start gap-2"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="border-t border-background/10 pt-8 pb-8">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-base mb-3 font-[arkhip] uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-background/10 rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-background/10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-background/60 text-sm">
            <span className="text-center sm:text-left">
              © {new Date().getFullYear()} Kedar Vanjape Developers – All Rights Reserved
            </span>
            <div className="w-full flex items-center justify-center py-8 sm:py-10 mt-8 ">
              <Link to="/">
                <img src="/images/kedarlogo.webp" alt="Kedar Vanjape Developers Logo" className="w-32 sm:w-40 object-contain hover:opacity-80 transition-opacity" />
              </Link>
            </div>
            <span className="text-center sm:text-right">
              Created by <a href="https://lazfort.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors duration-300">Lazfort Studio</a>
            </span>
          </div>
        </div>
      </div>

      {/* LOGO SECTION */}


    </footer>
  );
};

export default Footer;
