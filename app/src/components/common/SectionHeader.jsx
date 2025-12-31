import React from "react";
import { Link } from "react-router-dom";

const SectionHeader = ({
  title = "",
  linkText = "",
  linkTo = "",
  description = "",
  className = ""
}) => {
  return (
    <div className={`py-10 md:py-16 lg:py-20  px-5 flex flex-col justify-between ${className}`}>

        {/* Title */}
      <h1 className="text-4xl md:text-6xl lg:text-8xl uppercase font-bold font-[arkhip] leading-none">
        {title}
      </h1>

      <div className="mt-10 md:mt-16  flex flex-col lg:flex-row items-start lg:items-end justify-between ">
        
        {/* LEFT LINK */}
        <Link to={linkTo} className="border-b-2 border-dotted group hover:border-primary">
        <p className="uppercase text-sm md:text-base lg:text-lg font-[sansation] group-hover:text-primary transition-all duration-300">
            {linkText}
        </p>
        </Link>

        {/* DESCRIPTION */}
        <div className="flex-1 max-w-xl">
          <p className="font-noto text-base md:text-lg lg:text-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
