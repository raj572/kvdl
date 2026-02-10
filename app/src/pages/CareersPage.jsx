import { useEffect } from 'react';
import CareerForm from '../components/common/CareerForm';

const CareersPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-foreground text-background pt-24 md:pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-5 md:px-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Content */}
                    <div className="lg:sticky lg:top-32">
                        <h1 className="text-4xl md:text-6xl font-[arkhip] uppercase mb-8 leading-tight">
                            Join Our Team<span className="text-primary">.</span>
                        </h1>

                        <div className="space-y-6 text-background/80 font-[sansation] text-lg leading-relaxed">
                            <p>
                                At Kedar Vanjape, we believe our people are the foundation of our success in the real estate industry. Their dedication, passion, and expertise drive our achievements. We are looking for dynamic individuals who share our values and vision to join our team, grow their careers, and contribute to our collective success.
                            </p>
                            <p>
                                We are committed to creating employment opportunities in Pune’s ever-evolving real estate market, offering a work environment that inspires, challenges, and nurtures professional and personal growth.
                            </p>
                            <p>
                                Our goal is to provide a platform where talent is recognized, skills are honed, and success is a shared journey. If you are a proactive professional who thrives on challenges, values teamwork, and is driven by excellence, Kedar Vanjape is the perfect place for you. Join us and be a part of our journey toward innovation and success.
                            </p>
                        </div>


                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full bg-foreground-light/5 border border-white/5 p-6 md:p-10 rounded-2xl backdrop-blur-sm shadow-2xl shadow-black/50">
                        <CareerForm />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CareersPage;
