import { useEffect, useRef, useState } from 'react';

const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder = "Select an option",
    name,
    onFocus,
    onBlur,
    isFocused,
    theme = "dark", // "dark" (for dark backgrounds, light text) or "light" (for light backgrounds, dark text)
    label,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isDark = theme === "dark";
    const textColor = isDark ? "text-background" : "!text-black";
    const mutedTextColor = isDark ? "text-background/50" : "!text-black/50";
    const borderColor = isDark ? "border-background/10" : "border-black/10";
    const bgColor = isDark ? "bg-background/5" : "bg-black/5";
    const hoverBgColor = isDark ? "bg-background/5" : "bg-black/5"; // For options hover
    const dropdownBg = isDark ? "bg-foreground" : "bg-white"; // Dropdown matches theme? Or always dark?
    // Current implementation: `bg-foreground` (black)
    // If we are in light mode, dropdown should probably be white?
    // Let's stick to existing dropdown style (black bg) or generic?
    // User complaint: "draft text is not visible because it is white color" (in the selected view?).
    // "it is showing on hovering" -> likely referring to the dropdown options or the selected value.
    // If dropdown has `bg-foreground` (black), then `text-background` (cream) IS visible.
    // So the issue is likely the SELECTED VALUE display on the white drawer.
    // So I definitely need to fix the main button styles.

    // For dropdown options:
    // They currently use `text-background` (cream) on `bg-foreground` (black). This should be visible.
    // Unless `bg-foreground` on white drawer looks odd? (Black dropdown on white page).
    // Usually dropdowns match the input theme.
    // I'll make the dropdown background adapt too.
    const dropdownBgClass = isDark ? "bg-foreground" : "bg-white";
    const dropdownTextClass = isDark ? "text-background" : "text-black";
    const dropdownBorderClass = isDark ? "border-background/10" : "border-black/10";

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
        <div className="flex flex-col w-full gap-1 relative" ref={dropdownRef}>
            {label && <label className="text-[10px] font-bold uppercase opacity-60">{label}</label>}

            <button
                type="button"
                onClick={handleToggle}
                className={`w-full h-[42px] px-3 rounded-lg bg-foreground/5 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all text-left flex items-center justify-between cursor-pointer group ${className}`}
            >
                <div className="flex items-center justify-between w-full">
                    <span className={`font-[sansation] font-bold ${value ? textColor : mutedTextColor}`}>
                        {selectedOption || placeholder}
                    </span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} opacity-50 group-hover:opacity-100`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className={`absolute z-50 w-full top-full mt-1 ${dropdownBgClass} border ${dropdownBorderClass} shadow-xl rounded-lg overflow-hidden animate-slideDown`}>
                    <div className="max-h-60 overflow-y-auto scrollbar-hide">
                        {options.map((option, index) => (
                            <div key={index}>
                                <div
                                    onClick={() => handleSelect(option)}
                                    className={`relative px-4 py-3 cursor-pointer transition-all duration-200 font-[sansation] text-sm group ${value === option
                                        ? `bg-primary/20 ${dropdownTextClass} border-l-2 border-primary`
                                        : `${isDark ? 'text-background/80' : 'text-black/80'} hover:${hoverBgColor} hover:${dropdownTextClass} border-l-2 border-transparent hover:border-primary/50`
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
                                    <div className={`h-px ${isDark ? 'bg-background/5' : 'bg-black/5'}`}></div>
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
