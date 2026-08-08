import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", to = null, className = "", variant = "auto" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const isLightOnDark = variant === "dark" || className.includes("text-background");

  const baseClasses = isLightOnDark
    ? "border-background/25 bg-background/10 hover:bg-background hover:text-foreground text-background/90"
    : "border-foreground/20 bg-foreground/5 hover:bg-foreground hover:text-background text-foreground/80";

  return (
    <button
      onClick={handleClick}
      className={`w-fit inline-flex items-center gap-2.5 px-4 py-2 rounded-full border font-[sansation] text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer group ${baseClasses} ${className}`}
      title="Go Back"
    >
      <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
