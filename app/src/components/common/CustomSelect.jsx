import { useEffect, useRef, useState } from 'react';

const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder = "Select an option",
    name,
    onFocus,
    onBlur,
    isFocused
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                if (onBlur) onBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onBlur]);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
        if (onBlur) onBlur();
    };

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState && onFocus) {
            onFocus();
        } else if (!newState && onBlur) {
            onBlur();
        }
    };

    const selectedOption = options.find(opt => opt === value);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Selected Value Display */}
            <button
                type="button"
                onClick={handleToggle}
                className={`relative z-10 w-full px-6 py-4 bg-background/5 backdrop-blur-sm border ${isFocused
                    ? 'border-primary shadow-[0_0_20px_rgba(175,34,31,0.2)]'
                    : 'border-background/10'
                    } rounded-none text-left transition-all duration-500 font-[sansation] text-base focus:outline-none focus:bg-background/10 cursor-pointer overflow-hidden group`}
            >
                <div className="flex items-center justify-between relative z-10">
                    <span className={`transition-colors duration-300 ${value ? 'text-background' : 'text-background/30'}`}>
                        {selectedOption || placeholder}
                    </span>
                    <svg
                        className={`w-5 h-5 text-background transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-background/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Animated Underline */}
            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 pointer-events-none ${isFocused ? 'w-full' : 'w-0'
                }`}></div>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-foreground/95 backdrop-blur-md border border-primary/30 shadow-[0_10px_40px_rgba(175,34,31,0.25)] overflow-hidden animate-slideDown">
                    {/* Decorative top line */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>

                    <div className="max-h-80 overflow-y-auto scrollbar-hide">
                        {options.map((option, index) => (
                            <div key={index}>
                                <div
                                    onClick={() => handleSelect(option)}
                                    className={`relative px-6 py-3.5 cursor-pointer transition-all duration-200 font-[sansation] text-base group ${value === option
                                        ? 'bg-primary/20 text-background border-l-2 border-primary'
                                        : 'text-background/90 hover:bg-primary/10 hover:text-background border-l-2 border-transparent hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                                            {option}
                                        </span>
                                        {value === option && (
                                            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {/* Divider line between options */}
                                {index < options.length - 1 && (
                                    <div className="h-px bg-background/10"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Decorative bottom line */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
