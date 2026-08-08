import { useEffect } from 'react';
import CSRCarousel from '../components/common/CSRCarousel';
import MapSection from '../components/common/MapSection';
import BackButton from '../components/common/BackButton';
import TextScroll from '../components/common/TextScroll';


const About = () => {
  const csrImages = [
    { src: '/images/csr1.webp', alt: 'CSR Activity 1' },
    { src: '/images/csr2.webp', alt: 'CSR Activity 2' },
    { src: '/images/csr3.webp', alt: 'CSR Activity 3' },
    { src: '/images/csr4.webp', alt: 'CSR Activity 4' },
    { src: '/images/csr5.webp', alt: 'CSR Activity 5' },
    { src: '/images/csr6.webp', alt: 'CSR Activity 6' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-page min-h-dvh">

      {/* STICKY TOP SECTION — UNTOUCHED */}
      <div className="sticky top-0 z-10 w-full">
        <TextScroll
          text="About"
          repeat={24}
          duration={100}
          className="pt-20 pb-4 text-2xl md:pt-28 md:pb-6 md:text-4xl lg:text-5xl bg-background border-y border-foreground"
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="about-hero min-h-dvh bg-background relative z-20 ">

        {/* ABOUT SECTION */}
        <div className="flex flex-col items-center justify-center px-6 bg-foreground text-background ">
          <div className="max-w-6xl w-full pt-8 flex justify-start">
            <BackButton className="text-background/60 hover:text-primary" />
          </div>
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 pb-20 pt-10">

            {/* IMAGE */}
            <div className="w-full flex justify-center">
              <img
                src="/images/KVboss.webp"
                alt="Kedar Vanjape"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* TEXT */}
            <div>
              <h2 className="text-2xl font-bold uppercase font-[arkhip] mb-8 md:mb-10">
                About Us
              </h2>

              <p className="text-base md:text-lg leading-relaxed opacity-80">
                Kedar Vanjape Developers Pvt. Ltd. is a group of dynamic young professionals
                with energy and drive to take on new challenges while exploring new horizons.
                Committed to excellence and our philosophy of <strong>T2E (Trust, Transparency & Ethics)</strong>,
                we reflect the highest standards in all aspects of our operations.
              </p>
              <br />

              <p className="text-base md:text-lg leading-relaxed opacity-80">
                We act with absolute honesty, integrity and fairness in the way we conduct our business.
                With a culture that values experience and encourages initiative, we work in an inclusive
                environment where unique talent and perspective contribute to collective success.
              </p>
              <br />

              <p className="text-base md:text-lg leading-relaxed opacity-80">
                Courtesy and Care guide all our professional endeavors. KVDL is the brainchild of
                <strong> Mr. Kedar Vanjape</strong>, who has rich experience across all segments of the
                real estate industry. Formed in 2013, KVDL aims to redefine real estate practices in India
                with Transparency, Ethics, and Trust at its core.
              </p>
            </div>
          </div>
        </div>

        {/* VISION / MISSION */}
        <div className="py-5 md:py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

            <div className="p-8 rounded-2xl border-2 border-dotted">
              <h2 className="text-2xl font-bold uppercase font-[arkhip] mb-8 md:mb-10">
                Our Vision
              </h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                A high-performing environment where diversity, individual contributions and
                strong relationships thrive—an organization where
                <strong> Trust, Transparency & Ethics </strong>guide every step.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-dotted">
              <h2 className="text-2xl font-bold uppercase font-[arkhip] mb-8 md:mb-10">
                Our Mission
              </h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                We uphold the T2E philosophy—Trust, Transparency & Ethics—striving to exceed client
                expectations and build lasting partnerships. We deliver excellence through value engineering,
                effective construction, and complete legal transparency.
              </p>
            </div>

          </div>
        </div>

        {/* PODCAST SECTION */}
        <div className="py-5 md:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold uppercase font-[arkhip] mb-10">Podcasts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              <iframe
                className="w-full h-52 sm:h-64 md:h-56 rounded-xl shadow-md"
                src="https://www.youtube.com/embed/J9OqGmP_mXo"
                allowFullScreen
              />

              <iframe
                className="w-full h-52 sm:h-64 md:h-56 rounded-xl shadow-md"
                src="https://www.youtube.com/embed/QHxQakKyVtU"
                allowFullScreen
              />

              <iframe
                className="w-full h-52 sm:h-64 md:h-56 rounded-xl shadow-md"
                src="https://www.youtube.com/embed/N3IfqpBL4uQ"
                allowFullScreen
              />
            </div>
          </div>
        </div>



        {/* CSR SECTION */}
        <div className="py-5 md:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold uppercase font-[arkhip] mb-10">CSR Activities</h2>

            <CSRCarousel images={csrImages} />
          </div>
        </div>

        <MapSection />

      </div>
    </div>

  )
}

export default About