import { useRef, useState } from 'react';
import { FaCheckCircle, FaCloudUploadAlt, FaExclamationCircle } from 'react-icons/fa';
import { useApplyForJobMutation } from '../../services/careersApi';

const CareerForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        position: '',
        cover_letter: '',
    });
    const [resume, setResume] = useState(null);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const [applyForJob, { isLoading }] = useApplyForJobMutation();
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    const validate = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.position.trim()) newErrors.position = 'Position is required';
        if (!resume) newErrors.resume = 'Resume is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB
                setErrors(prev => ({ ...prev, resume: 'File size must be less than 10MB' }));
                return;
            }
            setResume(file);
            if (errors.resume) setErrors(prev => ({ ...prev, resume: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('resume', resume);

        try {
            await applyForJob(data).unwrap();
            setSubmitStatus('success');
            setFormData({
                full_name: '',
                email: '',
                phone: '',
                position: '',
                cover_letter: '',
            });
            setResume(null);
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } catch (err) {
            console.error('Application failed', err);
            setSubmitStatus('error');
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center animate-fadeIn text-background font-[sansation]">
                <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                <h3 className="text-2xl font-[arkhip] mb-2 uppercase">Application Sent!</h3>
                <p className="text-background/80">Thank you for applying. We will review your application and get back to you shortly.</p>
                <button
                    onClick={() => setSubmitStatus(null)}
                    className="mt-6 px-6 py-2 bg-primary/20 text-primary hover:bg-primary/30 transition-colors rounded uppercase text-sm font-bold tracking-wider"
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <div className="relative font-[sansation]">

            <h2 className="text-2xl font-[arkhip] uppercase mb-6 text-primary">Apply Now</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div className="form-group relative">
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.full_name ? 'border-primary/50' : 'border-background/10'} rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 focus:border-primary`}
                        placeholder="Full Name *"
                    />
                    {errors.full_name && <p className="mt-1 text-xs text-primary font-[sansation]">{errors.full_name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="form-group relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.email ? 'border-primary/50' : 'border-background/10'} rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 focus:border-primary`}
                            placeholder="Email Address *"
                        />
                        {errors.email && <p className="mt-1 text-xs text-primary font-[sansation]">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-group relative">
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.phone ? 'border-primary/50' : 'border-background/10'} rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 focus:border-primary`}
                            placeholder="Phone Number *"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-primary font-[sansation]">{errors.phone}</p>}
                    </div>
                </div>

                {/* Position */}
                <div className="form-group relative">
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${errors.position ? 'border-primary/50' : 'border-background/10'} rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 focus:border-primary`}
                        placeholder="Position Interest *"
                    />
                    {errors.position && <p className="mt-1 text-xs text-primary font-[sansation]">{errors.position}</p>}
                </div>

                {/* Cover Letter */}
                <div className="form-group relative">
                    <textarea
                        name="cover_letter"
                        value={formData.cover_letter}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-background/5 backdrop-blur-sm border border-background/10 rounded-none text-background placeholder:text-background/30 transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 focus:border-primary resize-none"
                        placeholder="Tell us a bit about yourself... (Optional)"
                    />
                </div>

                {/* Resume Upload */}
                <div className="form-group relative">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full px-4 py-6 bg-background/5 backdrop-blur-sm border border-dashed ${errors.resume ? 'border-primary/50' : 'border-background/20'} rounded-none cursor-pointer hover:bg-background/10 hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center text-center group`}
                    >
                        <FaCloudUploadAlt className="text-2xl mb-2 text-background/30 group-hover:text-primary transition-colors" />
                        <span className="text-xs text-background/60 group-hover:text-background transition-colors font-[sansation] tracking-wide">
                            {resume ? resume.name : 'Click to Upload Resume (PDF/DOC) *'}
                        </span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                        />
                    </div>
                    {errors.resume && <p className="mt-1 text-xs text-primary font-[sansation]">{errors.resume}</p>}
                </div>

                {/* Submit Logic */}
                {submitStatus === 'error' && (
                    <div className="p-3 bg-primary/10 border border-primary/20 text-primary text-center text-sm font-[sansation]">
                        <FaExclamationCircle className="inline mr-2" />
                        Failed to submit application. Please try again.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 bg-primary hover:bg-red-700 text-background border border-transparent font-[sansation] text-sm tracking-wide uppercase transition-all duration-300 transform hover:translate-y-[-2px] rounded-none ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/20'}`}
                >
                    {isLoading ? 'Sending...' : 'Submit Application'}
                </button>

            </form>
        </div>
    );
};

export default CareerForm;
