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
        } else {
            const cleanPhone = formData.phone.replace(/\s/g, '');
            if (!/^\d{10,15}$/.test(cleanPhone)) {
                newErrors.phone = 'Phone number must be 10-15 digits';
            }
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
            const { submitContactForm } = await import('../../services/api');
            const response = await submitContactForm(formData);

            if (response.success !== false) {
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
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 5000);
            }
        } catch (error) {
            if (!error.status) {
                alert('Cannot connect to server.');
            }
            if (error.status === 422 && error.errors) {
                const normalizedErrors = Object.fromEntries(
                    Object.entries(error.errors).map(([field, messages]) => [
                        field,
                        Array.isArray(messages) ? messages[0] : messages
                    ])
                );
                setErrors(normalizedErrors);
            }
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="form-group relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.name
                                ? 'border-primary/50'
                                : focusedField === 'name'
                                    ? 'border-primary'
                                    : 'border-background/10'
                                } rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10`}
                            placeholder="Full Name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-primary font-[sansation]">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.email
                                ? 'border-primary/50'
                                : focusedField === 'email'
                                    ? 'border-primary'
                                    : 'border-background/10'
                                } rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10`}
                            placeholder="Email Address"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-primary font-[sansation]">{errors.email}</p>
                        )}
                    </div>
                </div>

                {/* Phone and Property Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Phone Field */}
                    <div className="form-group relative">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.phone
                                ? 'border-primary/50'
                                : focusedField === 'phone'
                                    ? 'border-primary'
                                    : 'border-background/10'
                                } rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10`}
                            placeholder="Phone Number"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-xs text-primary font-[sansation]">{errors.phone}</p>
                        )}
                    </div>

                    {/* Property Type Field */}
                    <div className="form-group relative">
                        <CustomSelect
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            options={propertyTypes}
                            placeholder="Property Interest"
                            onFocus={() => setFocusedField('propertyType')}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === 'propertyType'}
                        />
                    </div>
                </div>

                {/* Subject Field */}
                <div className="form-group relative">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.subject
                            ? 'border-primary/50'
                            : focusedField === 'subject'
                                ? 'border-primary'
                                : 'border-background/10'
                            } rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10`}
                        placeholder="Subject"
                    />
                    {errors.subject && (
                        <p className="mt-1 text-xs text-primary font-[sansation]">{errors.subject}</p>
                    )}
                </div>

                {/* Message Field */}
                <div className="form-group relative">
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows="4"
                        spellCheck={false}
                        className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.message
                            ? 'border-primary/50'
                            : focusedField === 'message'
                                ? 'border-primary'
                                : 'border-background/10'
                            } rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 resize-none`}
                        placeholder="Your Message..."
                    />
                    {errors.message && (
                        <p className="mt-1 text-xs text-primary font-[sansation]">{errors.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-6 bg-primary hover:bg-red-700 text-background border border-transparent font-[sansation] text-sm tracking-wide uppercase transition-all duration-300 transform hover:translate-y-[-2px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/20'
                            }`}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </div>

                {/* Status Messages as separate overlay or small text below */}
                {submitStatus === 'success' && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm font-[sansation]">
                        Message sent successfully!
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="p-3 bg-primary/10 border border-primary/20 text-primary text-center text-sm font-[sansation]">
                        Something went wrong.
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
