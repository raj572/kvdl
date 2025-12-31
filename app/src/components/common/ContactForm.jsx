import { useState } from 'react';
import CustomSelect from './CustomSelect';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: ''
    });

    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const propertyTypes = [
        'Residential',
        'Commercial',
        'Investment',
        'Land',
        'Other'
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                propertyType: ''
            });

            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-2 mb-0">
            {/* Decorative Top Border */}
            <div className="flex items-center justify-center mb-0">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                <div className="mx-4 w-2 h-2 bg-primary rotate-45"></div>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2 mt-0">

                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="form-group relative">
                        <label
                            htmlFor="name"
                            className="block text-xs font-[arkhip] uppercase tracking-[0.2em] mb-3 text-background/70"
                        >
                            Full Name <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className={`relative z-10 w-full px-6 py-4 bg-background/5 backdrop-blur-sm border ${errors.name
                                    ? 'border-primary/50 shadow-[0_0_15px_rgba(175,34,31,0.3)]'
                                    : focusedField === 'name'
                                        ? 'border-primary shadow-[0_0_20px_rgba(175,34,31,0.2)]'
                                        : 'border-background/10'
                                    } rounded-none text-background placeholder:text-background/30 transition-all duration-500 font-[sansation] text-base focus:outline-none focus:bg-background/10`}
                                placeholder="Enter your full name"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 pointer-events-none ${focusedField === 'name' ? 'w-full' : 'w-0'
                                }`}></div>
                        </div>
                        {errors.name && (
                            <p className="mt-2 text-xs text-primary font-[sansation] tracking-wide">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group relative">
                        <label
                            htmlFor="email"
                            className="block text-xs font-[arkhip] uppercase tracking-[0.2em] mb-3 text-background/70"
                        >
                            Email Address <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className={`relative z-10 w-full px-6 py-4 bg-background/5 backdrop-blur-sm border ${errors.email
                                    ? 'border-primary/50 shadow-[0_0_15px_rgba(175,34,31,0.3)]'
                                    : focusedField === 'email'
                                        ? 'border-primary shadow-[0_0_20px_rgba(175,34,31,0.2)]'
                                        : 'border-background/10'
                                    } rounded-none text-background placeholder:text-background/30 transition-all duration-500 font-[sansation] text-base focus:outline-none focus:bg-background/10`}
                                placeholder="your.email@example.com"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 pointer-events-none ${focusedField === 'email' ? 'w-full' : 'w-0'
                                }`}></div>
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-xs text-primary font-[sansation] tracking-wide">{errors.email}</p>
                        )}
                    </div>
                </div>

                {/* Phone and Property Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone Field */}
                    <div className="form-group relative">
                        <label
                            htmlFor="phone"
                            className="block text-xs font-[arkhip] uppercase tracking-[0.2em] mb-3 text-background/70"
                        >
                            Phone Number <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                className={`relative z-10 w-full px-6 py-4 bg-background/5 backdrop-blur-sm border ${errors.phone
                                    ? 'border-primary/50 shadow-[0_0_15px_rgba(175,34,31,0.3)]'
                                    : focusedField === 'phone'
                                        ? 'border-primary shadow-[0_0_20px_rgba(175,34,31,0.2)]'
                                        : 'border-background/10'
                                    } rounded-none text-background placeholder:text-background/30 transition-all duration-500 font-[sansation] text-base focus:outline-none focus:bg-background/10`}
                                placeholder="10-digit mobile number"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 pointer-events-none ${focusedField === 'phone' ? 'w-full' : 'w-0'
                                }`}></div>
                        </div>
                        {errors.phone && (
                            <p className="mt-2 text-xs text-primary font-[sansation] tracking-wide">{errors.phone}</p>
                        )}
                    </div>

                    {/* Property Type Field */}
                    <div className="form-group relative">
                        <label
                            htmlFor="propertyType"
                            className="block text-xs font-[arkhip] uppercase tracking-[0.2em] mb-3 text-background/70"
                        >
                            Property Interest
                        </label>
                        <CustomSelect
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            options={propertyTypes}
                            placeholder="Select property type"
                            onFocus={() => setFocusedField('propertyType')}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === 'propertyType'}
                        />
                    </div>
                </div>

                {/* Subject Field */}
                <div className="form-group relative mt-24">
                    <label
                        htmlFor="subject"
                        className="block text-xs font-[arkhip] uppercase tracking-[0.2em] mb-3 text-background/70"
                    >
                        Subject <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            className={`relative z-10 w-full px-6 py-4 bg-background/5 backdrop-blur-sm border ${errors.subject
                                ? 'border-primary/50 shadow-[0_0_15px_rgba(175,34,31,0.3)]'
                                : focusedField === 'subject'
                                    ? 'border-primary shadow-[0_0_20px_rgba(175,34,31,0.2)]'
                                    : 'border-background/10'
                                } rounded-none text-background placeholder:text-background/30 transition-all duration-500 font-[sansation] text-base focus:outline-none focus:bg-background/10`}
                            placeholder="What would you like to discuss?"
                        />
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 pointer-events-none ${focusedField === 'subject' ? 'w-full' : 'w-0'
                            }`}></div>
                    </div>
                    {errors.subject && (
                        <p className="mt-2 text-xs text-primary font-[sansation] tracking-wide">{errors.subject}</p>
                    )}
                </div>

                {/* Message Field */}
                <div className="form-group relative">
                    <label
                        htmlFor="message"
                        className="block text-xs font-[arkhip] uppercase tracking-[0.2em] mb-3 text-background/70"
                    >
                        Message <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows="6"
                            spellCheck={false}
                            className={`relative z-10 w-full px-6 py-4 bg-background/5 backdrop-blur-sm border ${errors.message
                                ? 'border-primary/50 shadow-[0_0_15px_rgba(175,34,31,0.3)]'
                                : focusedField === 'message'
                                    ? 'border-primary shadow-[0_0_20px_rgba(175,34,31,0.2)]'
                                    : 'border-background/10'
                                } rounded-none text-background placeholder:text-background/30 transition-all duration-500 font-[sansation] text-base focus:outline-none focus:bg-background/10 resize-none`}
                            placeholder="Tell us more about your requirements..."
                        />
                    </div>
                    {errors.message && (
                        <p className="mt-2 text-xs text-primary font-[sansation] tracking-wide">{errors.message}</p>
                    )}
                </div>


                {/* Submit Button */}
                <div className="flex flex-col items-center gap-6 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`py-3 px-8 bg-primary hover:bg-red-700 text-background border font-[sansation] rounded-full cursor-pointer transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="inline-block w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                                Sending...
                            </span>
                        ) : (
                            'Send Message'
                        )}
                    </button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="w-full max-w-2xl p-6 bg-background/10 backdrop-blur-sm border-2 border-green-500 text-background text-center animate-fadeIn">
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="font-[sansation] text-base tracking-wide">Thank you! Your message has been sent successfully.</p>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="w-full max-w-2xl p-6 bg-background/10 backdrop-blur-sm border-2 border-primary text-background text-center animate-fadeIn">
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <p className="font-[sansation] text-base tracking-wide">Something went wrong. Please try again.</p>
                            </div>
                        </div>
                    )}
                </div>
            </form>

            {/* Decorative Bottom Border */}
            <div className="flex items-center justify-center mt-12">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                <div className="mx-4 w-2 h-2 bg-primary rotate-45"></div>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
        </div>
    );
};

export default ContactForm;
