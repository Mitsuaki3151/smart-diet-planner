import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className,
    isLoading,
    disabled,
    ...props
}) => {
    // I should probably switch to standard CSS or ensure `index.css` has these utilities.
    // Or I can just write inline styles for now to be safe and fast, or convert to CSS Modules.
    // Given the instruction "Use Vanilla CSS", I should stick to that.

    // Refactoring to use CSS Modules / standard classes defined in a component CSS file would be better.
    // But for speed in this prototype, I'll use inline styles or simple class names and define them in `components.css`.

    return (
        <button
            className={`btn btn-${variant} ${className || ''}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            {children}
        </button>
    );
};
