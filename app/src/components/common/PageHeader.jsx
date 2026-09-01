import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkle } from 'lucide-react';
import BackButton from './BackButton';

const PageHeader = ({
  badge = '',
  title = '',
  description = '',
  breadcrumb = [],
  showBackButton = true,
  variant = 'light',
  className = '',
  children,
}) => {
  const isDark = variant === 'dark';

  return (
    <header
      className={`w-full pt-4 sm:pt-6 md:pt-10 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 ${
        isDark ? 'text-background' : 'text-foreground'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8">
        {/* Top Navigation Row: Back Button & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {showBackButton ? (
            <BackButton
              variant={isDark ? 'dark' : 'auto'}
              className="hover:border-primary transition-all duration-300 text-xs"
            />
          ) : (
            <div />
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-[sansation] uppercase tracking-wider opacity-70"
            >
              {breadcrumb.map((item, index) => {
                const isLast = index === breadcrumb.length - 1;
                return (
                  <React.Fragment key={index}>
                    {item.link && !isLast ? (
                      <Link
                        to={item.link}
                        className="hover:text-primary transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'text-primary font-bold' : ''}>
                        {item.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronRight
                        size={12}
                        className="opacity-40 shrink-0 sm:w-3.5 sm:h-3.5"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>

        {/* Main Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 md:gap-8 pt-1 sm:pt-2">
          <div className="flex-1 max-w-3xl">
            {/* Optional Eyebrow Badge */}
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-primary/10 text-primary border border-primary/25 mb-2.5 sm:mb-4 font-[sansation]">
                <Sparkle size={10} className="shrink-0 fill-current sm:w-3 sm:h-3" />
                <span>{badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[arkhip] uppercase tracking-tight leading-[1.08] break-words">
              {title}
              <span className="text-primary">.</span>
            </h1>
          </div>

          {/* Description */}
          {description && (
            <div className="lg:max-w-md xl:max-w-lg">
              <p
                className={`font-[sansation] text-sm sm:text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-background/80' : 'text-foreground/75'
                }`}
              >
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Optional Slot for filter tabs or extra content */}
        {children && <div className="pt-2">{children}</div>}

        {/* Subtle Architectural Divider */}
        <div className="relative w-full pt-3 sm:pt-4">
          <div
            className={`w-full h-px ${
              isDark ? 'bg-background/15' : 'bg-foreground/15'
            }`}
          />
          <div className="absolute left-0 bottom-[-2px] w-8 sm:w-12 h-[3px] bg-primary" />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
