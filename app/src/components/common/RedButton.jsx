import { Link } from "react-router-dom";

const RedButton = ({ to, label, onClick, className = "" }) => {
    const buttonClasses = `w-fit py-2 px-6 bg-primary hover:bg-red-700 text-background border font-[sansation] rounded-full cursor-pointer transition duration-300 ${className}`;

    if (to) {
        return (
            <Link to={to} className={buttonClasses}>
                {label}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={buttonClasses}>
            {label}
        </button>
    );
};

export default RedButton;
