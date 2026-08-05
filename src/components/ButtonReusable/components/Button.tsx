import React from "react";
import "../styles/Button.css";

export interface ButtonProps {
  // Content
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  
  // Styling
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "small" | "medium" | "large";
  
  // States
  disabled?: boolean;
  loading?: boolean;
  
  // Behavior
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  
  // Accessibility
  ariaLabel?: string;
  title?: string;
  
  // Custom
  className?: string;
  id?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      iconPosition = "left",
      variant = "primary",
      size = "medium",
      disabled = false,
      loading = false,
      onClick,
      type = "button",
      ariaLabel,
      title,
      className = "",
      id,
    },
    ref
  ) => {
    // Merge classes
    const buttonClasses = [
      "button",
      `button--${variant}`,
      `button--${size}`,
      disabled || loading ? "button--disabled" : "",
      loading ? "button--loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Handle click (disabled logic)
    const handleClick = () => {
      if (!disabled && !loading && onClick) {
        onClick();
      }
    };

    // Render content based on state
    const renderContent = () => {
      if (loading) {
        return (
          <>
            <span className="button__spinner"></span>
            {children && <span className="button__text">{children}</span>}
          </>
        );
      }

      return (
        <>
          {icon && iconPosition === "left" && (
            <span className="button__icon button__icon--left">{icon}</span>
          )}

          {children && <span className="button__text">{children}</span>}

          {icon && iconPosition === "right" && (
            <span className="button__icon button__icon--right">{icon}</span>
          )}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        type={type}
        aria-label={ariaLabel}
        title={title}
        id={id}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;