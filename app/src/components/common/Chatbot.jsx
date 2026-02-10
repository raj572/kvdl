import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! Welcome to KVDL. How can I assist you in your property search today? 🏠' }
    ]);
    const [currentStep, setCurrentStep] = useState('main');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    // Chat Flow Configuration
    const flow = {
        main: {
            options: [
                { label: 'View Latest Projects', next: 'projects_list', response: 'Here are our featured premium developments.' },
                { label: 'Request a Callback', next: 'contact_form', response: 'Sure! Please fill out the contact form on our contact page.', action: 'navigate', path: '/contact' },
                { label: 'Contact Information', next: 'contact_info', response: 'You can reach us at sales@kvdl.com or +91 98765 43210.' },
                { label: 'Office Location', next: 'location', response: 'We are located at KVDL Towers, Baner, Pune.' }
            ]
        },
        projects_list: {
            options: [
                { label: 'KVDL Highbreeze', next: 'project_highbreeze', response: 'Highbreeze is a premium residential tower in Baner. 3 & 4 BHK Apartments.' },
                { label: 'KVDL Greenfields', next: 'project_greenfields', response: 'Greenfields offers luxury villas in Hinjewadi. 4 & 5 BHK Villas.' },
                { label: 'View All Projects', action: 'navigate', path: '/projects', response: 'Redirecting you to our projects gallery...' },
                { label: '⬅️ Main Menu', next: 'main', response: 'Back to main menu. How else can I help?' }
            ]
        },
        project_highbreeze: {
            options: [
                { label: 'View Details Page', action: 'navigate', path: '/projects/1', response: 'Opening Highbreeze details...' },
                { label: 'Book Site Visit', next: 'book_visit', response: 'Great! Please call us at +91 98765 43210 to schedule.' },
                { label: '⬅️ Back to Projects', next: 'projects_list', response: 'Showing project list again.' }
            ]
        },
        project_greenfields: {
            options: [
                { label: 'View Details Page', action: 'navigate', path: '/projects/2', response: 'Opening Greenfields details...' },
                { label: 'Book Site Visit', next: 'book_visit', response: 'Great! Please call us at +91 98765 43210 to schedule.' },
                { label: '⬅️ Back to Projects', next: 'projects_list', response: 'Showing project list again.' }
            ]
        },
        contact_info: {
            options: [
                { label: '⬅️ Main Menu', next: 'main', response: 'What else would you like to know?' }
            ]
        },
        location: {
            options: [
                { label: 'Get Directions', action: 'link', url: 'https://maps.google.com', response: 'Opening Google Maps...' },
                { label: '⬅️ Main Menu', next: 'main', response: 'Back to main menu.' }
            ]
        },
        book_visit: {
            options: [
                { label: '⬅️ Main Menu', next: 'main', response: 'Is there anything else?' }
            ]
        }
    };

    const handleOption = (option) => {
        // Add User Message
        setMessages(prev => [...prev, { type: 'user', text: option.label }]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);

            // Add Bot Response
            setMessages(prev => [...prev, { type: 'bot', text: option.response }]);

            // Handle Navigation Action
            if (option.action === 'navigate') {
                setTimeout(() => navigate(option.path), 1000);
            }
            else if (option.action === 'link') {
                window.open(option.url, '_blank');
            }

            // Update Flow Step
            if (option.next) {
                setCurrentStep(option.next);
            }

        }, 800);
    };

    // Get current options based on step
    const currentOptions = flow[currentStep]?.options || [];

    return (
        <div className="fixed bottom-6 right-6 z-50 font-[sansation]">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl w-[350px] overflow-hidden border border-[#0a0a0a]/10 mb-4 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-[#0a0a0a] p-4 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-primary font-[arkhip] tracking-wider text-sm">KVDL Assistant</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] text-white/60 uppercase tracking-widest">Online Now</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages Body */}
                        <div className="bg-[#fcf8f2] flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                            ${msg.type === 'user'
                                                ? 'bg-primary text-[#0a0a0a] rounded-tr-none font-bold'
                                                : 'bg-[#1a1a1a] text-white rounded-tl-none'
                                            }
                                        `}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#1a1a1a] p-3 rounded-2xl rounded-tl-none w-12 flex items-center justify-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-150"></div>
                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Options Footer */}
                        <div className="p-4 bg-white border-t border-[#0a0a0a]/5 shrink-0">
                            <div className="flex flex-wrap gap-2 justify-end">
                                {currentOptions.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOption(opt)}
                                        className="text-xs bg-white border border-[#0a0a0a]/10 hover:border-primary hover:text-primary hover:bg-[#fff9e6] px-3 py-2 rounded-full transition-all duration-200 shadow-sm text-right"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#0a0a0a] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-primary border border-primary/20"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
