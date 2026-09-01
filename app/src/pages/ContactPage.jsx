import { useEffect } from 'react';
import ContactForm from '../components/common/ContactForm';
import MapSection from '../components/common/MapSection';
import PageHeader from '../components/common/PageHeader';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      title: "Phone",
      items: ["+91 86055 58833"],
      link: "tel:+918605558833"
    },
    {
      title: "Email",
      items: ["sales@kvdl.in"],
      link: "mailto:sales@kvdl.in"
    },
    {
      title: "Address",
      items: [
        "302, 3rd floor, CTS.No. 1201/7, Arc Maestro,",
        "Near Hotel Rajwadi Gourav,",
        "Shivajinagar, Pune – 411004"
      ],
      link: "#map"
    },
    {
      title: "Hours",
      items: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-foreground text-background font-[sansation] pt-[70px] md:pt-[85px]">
      {/* Header Section */}
      <PageHeader
        variant="dark"
        badge="Reach Out"
        title="Get In Touch"
        description="Have questions about our properties or want to schedule a visit? We're here to help you find your dream home."
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Contact" }
        ]}
      />

      {/* Main Content Split */}
      <div className="max-w-[1400px] mx-auto px-5 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-[arkhip] uppercase mb-6 leading-tight">
                Let's Start a <br />
                <span className="text-primary">Conversation</span>
              </h2>
              <p className="text-background/70 text-lg leading-relaxed max-w-md">
                Whether you're looking for your dream home or a smart investment, our team is ready to assist you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-primary font-[arkhip] uppercase tracking-wider text-sm">
                    {info.title}
                  </h3>
                  <div className="flex flex-col space-y-1">
                    {info.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={info.link || '#'}
                        className={`text-lg sm:text-xl font-light ${info.link ? 'hover:text-primary transition-colors duration-300 cursor-pointer' : 'cursor-default'}`}
                        onClick={(e) => {
                          if (!info.link) e.preventDefault();
                          if (info.link === '#map') {
                            e.preventDefault();
                            document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-background/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-background/10">
            <h3 className="text-2xl font-[arkhip] uppercase mb-6">Send Message</h3>
            <ContactForm />
          </div>

        </div>
      </div>

      {/* Map Section */}
      <div id="map">
        <MapSection />
      </div>

    </div>
  );
};

export default ContactPage;