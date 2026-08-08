import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CustomDateTimePicker = ({ value, onChange, label, align = 'left' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('date'); // 'date' or 'time'
    const containerRef = useRef(null);

    // Parse initial value or default to now
    const initialDate = value ? new Date(value) : new Date();

    // State for Date Picker
    const [currentMonth, setCurrentMonth] = useState(initialDate);
    const [selectedDate, setSelectedDate] = useState(initialDate);

    // State for Time Picker
    const [selectedHour, setSelectedHour] = useState(initialDate.getHours());
    const [selectedMinute, setSelectedMinute] = useState(initialDate.getMinutes());
    const [ampm, setAmpm] = useState(initialDate.getHours() >= 12 ? 'PM' : 'AM');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setMode('date');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update internal state when value prop changes
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            setSelectedDate(date);
            setSelectedHour(date.getHours());
            setSelectedMinute(date.getMinutes());
            setAmpm(date.getHours() >= 12 ? 'PM' : 'AM');
        }
    }, [value]);

    const formatDateTime = (date) => {
        if (!date) return '';
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        newDate.setHours(selectedHour);
        newDate.setMinutes(selectedMinute);

        setSelectedDate(newDate);
        setMode('time'); // Switch to time selection after date

        const offset = newDate.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(newDate - offset)).toISOString().slice(0, 16);
        onChange({ target: { value: localISOTime } });
    };

    const updateTime = (hour, minute) => {
        const newDate = new Date(selectedDate);
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        setSelectedDate(newDate);

        const offset = newDate.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(newDate - offset)).toISOString().slice(0, 16);
        onChange({ target: { value: localISOTime } });
    };

    const handleHourChange = (hour12) => {
        let newHour = hour12;
        if (ampm === 'PM' && hour12 !== 12) newHour += 12;
        if (ampm === 'AM' && hour12 === 12) newHour = 0;

        setSelectedHour(newHour);
        updateTime(newHour, selectedMinute);
    };

    const handleMinuteChange = (minute) => {
        setSelectedMinute(minute);
        updateTime(selectedHour, minute);
    };

    const handleAmpmChange = (newAmpm) => {
        setAmpm(newAmpm);
        let newHour = selectedHour;

        if (newAmpm === 'PM' && selectedHour < 12) {
            newHour += 12;
        } else if (newAmpm === 'AM' && selectedHour >= 12) {
            newHour -= 12;
        }

        setSelectedHour(newHour);
        updateTime(newHour, selectedMinute);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const generateCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth);
        const startDay = firstDayOfMonth(currentMonth);

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const isSelected = selectedDate &&
                selectedDate.getDate() === i &&
                selectedDate.getMonth() === currentMonth.getMonth() &&
                selectedDate.getFullYear() === currentMonth.getFullYear();

            const isToday = new Date().getDate() === i &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear();

            days.push(
                <button
                    key={i}
                    onClick={() => handleDateClick(i)}
                    className={`p-2 text-xs rounded-lg transition-colors font-bold
                        ${isSelected ? 'bg-primary text-white' :
                            isToday ? 'bg-primary/10 text-primary' :
                                'hover:bg-black/5 text-black/70'}`}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    // 1-12 for Hours
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const minutes = Array.from({ length: 60 }, (_, i) => i); // 0-59 for every minute

    // Scroll to selected time when mode switches
    useEffect(() => {
        if (mode === 'time' && isOpen) {
            const timer = setTimeout(() => {
                const h = (selectedHour % 12) || 12;
                document.getElementById(`time-h-${h}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
                document.getElementById(`time-m-${selectedMinute}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [mode, isOpen]);

    return (
        <div className="flex flex-col w-full gap-1 relative" ref={containerRef}>
            {label && <label className="text-[10px] font-bold uppercase opacity-60">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-[42px] px-3 rounded-lg bg-foreground/5 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all text-left flex items-center justify-between hover:bg-foreground/10 group"
            >
                <span className="font-[sansation] font-bold text-foreground/80">
                    {formatDateTime(selectedDate)}
                </span>
                <CalendarIcon size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>

            {isOpen && (
                <div className={`absolute z-50 top-full mt-1 w-[280px] bg-white border border-black/10 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}>
                    {/* Header Switcher */}
                    <div className="flex bg-black/5 p-1">
                        <button
                            onClick={() => setMode('date')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${mode === 'date' ? 'bg-white shadow-sm text-primary' : 'text-black/40 hover:text-black'}`}
                        >
                            <CalendarIcon size={12} /> Date
                        </button>
                        <button
                            onClick={() => setMode('time')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${mode === 'time' ? 'bg-white shadow-sm text-primary' : 'text-black/40 hover:text-black'}`}
                        >
                            <Clock size={12} /> Time
                        </button>
                    </div>

                    <div className="p-4">
                        {mode === 'date' ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <button onClick={prevMonth} className="p-1 hover:bg-black/5 rounded-full"><ChevronLeft size={16} /></button>
                                    <span className="text-xs font-bold uppercase tracking-widest">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                                    <button onClick={nextMonth} className="p-1 hover:bg-black/5 rounded-full"><ChevronRight size={16} /></button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                        <span key={d} className="text-[8px] font-bold uppercase opacity-40">{d}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                    {generateCalendar()}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                {/* AM/PM Toggle */}
                                <div className="flex bg-black/5 p-1 rounded-lg">
                                    <button
                                        onClick={() => handleAmpmChange('AM')}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${ampm === 'AM' ? 'bg-white text-primary shadow-sm' : 'text-black/50 hover:text-black'}`}
                                    >
                                        AM
                                    </button>
                                    <button
                                        onClick={() => handleAmpmChange('PM')}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${ampm === 'PM' ? 'bg-white text-primary shadow-sm' : 'text-black/50 hover:text-black'}`}
                                    >
                                        PM
                                    </button>
                                </div>

                                <div className="flex gap-2 h-[200px]">
                                    {/* Hour Column */}
                                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar mask-gradient pb-10">
                                        <label className="text-[10px] font-bold uppercase opacity-40 mb-1 block text-center sticky top-0 bg-white py-1 z-10">Hour</label>
                                        {hours.map(h => {
                                            const isSelected = (selectedHour % 12 || 12) === h;
                                            return (
                                                <button
                                                    key={h}
                                                    id={`time-h-${h}`}
                                                    onClick={() => handleHourChange(h)}
                                                    className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${isSelected ? 'bg-primary text-white scale-100' : 'hover:bg-black/5 text-black/40 scale-90 hover:scale-100'}`}
                                                >
                                                    {h}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="w-px bg-black/5 my-2"></div>

                                    {/* Minute Column */}
                                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar mask-gradient pb-10">
                                        <label className="text-[10px] font-bold uppercase opacity-40 mb-1 block text-center sticky top-0 bg-white py-1 z-10">Minute</label>
                                        {minutes.map(m => (
                                            <button
                                                key={m}
                                                id={`time-m-${m}`}
                                                onClick={() => handleMinuteChange(m)}
                                                className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${selectedMinute === m ? 'bg-primary text-white scale-100' : 'hover:bg-black/5 text-black/40 scale-90 hover:scale-100'}`}
                                            >
                                                {m.toString().padStart(2, '0')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDateTimePicker;
