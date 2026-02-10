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
                className={`relative z-10 w-full px-4 py-3 bg-background/5 backdrop-blur-sm border ${isFocused
                    ? 'border-primary shadow-[0_0_15px_rgba(175,34,31,0.15)]'
                    : 'border-background/10'
                    } rounded-none text-left transition-all duration-300 font-[sansation] text-sm focus:outline-none focus:bg-background/10 cursor-pointer overflow-hidden group`}
            >
                <div className="flex items-center justify-between relative z-10">
                    <span className={`transition-colors duration-300 ${value ? 'text-background' : 'text-background/50'}`}>
                        {selectedOption || placeholder}
                    </span>
                    <svg
                        className={`w-4 h-4 text-background/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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
            <div className={`absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-300 pointer-events-none ${isFocused ? 'w-full' : 'w-0'
                }`}></div>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-foreground border border-background/10 shadow-xl overflow-hidden animate-slideDown">
                    <div className="max-h-60 overflow-y-auto scrollbar-hide">
                        {options.map((option, index) => (
                            <div key={index}>
                                <div
                                    onClick={() => handleSelect(option)}
                                    className={`relative px-4 py-3 cursor-pointer transition-all duration-200 font-[sansation] text-sm group ${value === option
                                        ? 'bg-primary/20 text-background border-l-2 border-primary'
                                        : 'text-background/80 hover:bg-background/5 hover:text-background border-l-2 border-transparent hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                                            {option}
                                        </span>
                                        {value === option && (
                                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {/* Divider line between options */}
                                {index < options.length - 1 && (
                                    <div className="h-px bg-background/5"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
