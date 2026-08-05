import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "outline";
export type ButtonSize = "small" | "medium" | "large";
export type IconPosition = "left" | "right";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Content
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  
  // Styling
  variant?: ButtonVariant;
  size?: ButtonSize;
  
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
}