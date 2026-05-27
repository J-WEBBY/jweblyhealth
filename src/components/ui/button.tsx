import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size    = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white shadow-[0_2px_16px_rgba(30,107,86,0.28)] ' +
    'hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(30,107,86,0.36)] ' +
    'focus-visible:ring-accent/50',
  outline:
    'bg-transparent text-ink border border-[var(--border)] ' +
    'hover:bg-surface hover:border-[var(--border)] ' +
    'focus-visible:ring-ink/20',
  ghost:
    'bg-transparent text-ink/60 ' +
    'hover:text-ink hover:bg-surface ' +
    'focus-visible:ring-ink/20',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8  px-4 text-[13px] rounded-[20px] gap-1.5',
  md: 'h-10 px-5 text-[14px] rounded-[24px] gap-2',
  lg: 'h-12 px-7 text-[15px] rounded-[28px] gap-2',
};

export function Button({
  variant = 'primary',
  size    = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium',
        'tracking-[-0.01em] transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2',
        'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
