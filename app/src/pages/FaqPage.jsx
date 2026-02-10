import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-neutral-800">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={onClick}
            >
                <h3 className="text-lg md:text-xl font-[arkhip] text-background group-hover:text-primary transition-colors">{question}</h3>
                <span className="text-primary">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <p className="pb-6 text-background/70 font-[sansation] leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FaqPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Where are Kedar Vanjape Developers' projects located?",
            answer: "Our projects are strategically located in prime areas of Pune, including Kothrud, Bavdhan, Pashan-Sus Road, and other developing hubs, ensuring excellent connectivity and lifestyle convenience."
        },
        {
            question: "Do you offer commercial properties?",
            answer: "Currently, our primary focus is on delivering premium residential projects. However, some of our developments may feature mixed-use spaces. Please check individual project details for more information."
        },
        {
            question: "Are your projects RERA registered?",
            answer: "Yes, absolutely. All our ongoing and completed projects are fully compliant with RERA regulations. You can find the specific RERA registration number on each project's detail page."
        },
        {
            question: "How can I schedule a site visit?",
            answer: "Scheduling a site visit is easy! You can fill out the form on our Contact page, or call our sales team directly at +91 98765 43210. We will arrange a convenient time for you to tour the property."
        },
        {
            question: "What amenities do you typically provide?",
            answer: "We believe in providing a holistic lifestyle. Our projects typically feature amenities such as landscaped gardens, clubhouses, gymnasiums, children's play areas, 24/7 security, and power backup. Specific amenities vary by project."
        },
        {
            question: "Do you provide assistance with home loans?",
            answer: "Yes, we have tie-ups with all major nationalized and private banks to help you secure the best home loan rates and assist with the documentation process."
        }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-foreground text-background pt-20 md:pt-28 pb-10">
            <div className="max-w-[1000px] mx-auto px-5 md:px-10">

                <h1 className="text-4xl md:text-6xl font-[arkhip] uppercase mb-6 text-center">
                    Frequently Asked Questions<span className="text-primary">.</span>
                </h1>
                <p className="text-center text-background/60 font-[sansation] mb-16 max-w-2xl mx-auto">
                    Find answers to common questions about our projects, buying process, and services.
                </p>

                <div className="flex flex-col">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFaq(index)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FaqPage;
