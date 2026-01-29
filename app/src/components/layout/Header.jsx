import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState("");
  const tl = useRef(null);
  const navRef = useRef(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  //Handle Burger Menu Click
  const handleNavClick = (e, path) => {
    e.preventDefault();
    setOpen("");

    tl.current.reverse().then(() => {
      window.location.href = path;
    });
  };

  // MENU OVERLAY ANIMATION
  useGSAP(() => {
    gsap.set(".menu-item p", { y: 225 });
    gsap.set(".red-line", { width: 0 });

    tl.current = gsap.timeline({ paused: true });

    tl.current.to(".overlay", {
      duration: 1.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut"
    });

    tl.current.to(
      ".menu-item p",
      {
        duration: 1.5,
        y: 0,
        stagger: 0.2,
        ease: "power4.out"
      },
      "-=1"
    );

    // ACTIVE RED LINE ANIMATION
    tl.current.to(
      '.red-line[data-active="true"]',
      {
        width: "100%",
        duration: 1.2,
        ease: "power4.out"
      },
      "-=1"
    );

    tl.current.to(
      ".sub-nav",
      {
        bottom: "10%",
        opacity: 1,
        duration: 0.5,
        delay: 0.5
      },
      "<"
    );
  }, []);

  // CONTROL PLAY / REVERSE (menu open/close)
  useEffect(() => {
    if (tl.current) {
      open === "active" ? tl.current.play() : tl.current.reverse();
    }
  }, [open]);

  // NAVBAR HIDE/SHOW ON SCROLL
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        // scrolling down — hide navbar
        gsap.to(navRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power2.out"
        });
      } else {
        // scrolling up — show navbar
        gsap.to(navRef.current, {
          y: "0%",
          duration: 1,
          ease: "power2.out"
        });
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentPath = window.location.pathname;

  return (
    <>
      <nav
        ref={navRef}
        className="navbar fixed w-full flex justify-between items-center px-5 py-4 bg-blend-difference z-50 bg-foreground"
      >
        {/* LOGO */}
        <div className="logo w-40 md:w-52">
          <img src="/images/kedarlogo.webp" alt="kvdl logo" />
        </div>

        {/* BURGER BUTTON */}
        <div className="toggle-btn flex justify-end">
          <button
            className={`burger flex justify-center items-center p-4 transition-all duration-300 cursor-pointer ${open === "active" ? "active" : ""
              }`}
            onClick={() => setOpen(open === "" ? "active" : "")}
          ></button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className="overlay fixed top-0 left-0 w-screen h-screen flex bg-foreground text-background z-40"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
        }}
      >
        <div className="overlay-menu font-[arkhip] fixed top-0 left-0 w-screen h-screen gap-6 uppercase text-3xl md:text-4xl lg:text-5xl font-bold flex flex-col justify-center items-center">

          {menuItems.map((item) => (
            <div key={item.path} className="menu-item relative group">
              <p className="relative z-10 transition-transform duration-300 group-hover:scale-110" onClick={(e) => handleNavClick(e, item.path)}>{item.name}</p>

              {/* ACTIVE RED LINE */}
              <div
                className="red-line h-3 bg-primary absolute left-0 bottom-1 -z-10"
                data-active={currentPath === item.path}
              />
            </div>
          ))}
        </div>

        {/* SUB NAV LINKS */}
        <div className="sub-nav absolute bottom-[5%] opacity-0 left-[50%] translate-x-[-50%] flex gap-2 text-background text-xs md:text-lg">
          <p><a href="#">WhatsApp</a></p>
          <p>.</p>
          <p><a href="#">Youtube</a></p>
          <p>.</p>
          <p><a href="#">Facebook</a></p>
        </div>
      </div>
    </>
  );
};

export default Header;
