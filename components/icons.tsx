type IconProps = {
  className?: string;
};

export function RiceMark({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 39V13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 35c-7-2-11-8-12-17 8 2 12 8 12 17Z" fill="#D8F3E4" stroke="currentColor" strokeWidth="2" />
      <path d="M24 30c7-2 11-8 12-17-8 2-12 8-12 17Z" fill="#EEF8F3" stroke="currentColor" strokeWidth="2" />
      <path d="M19 41h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M7 9a5 5 0 0 1 10 0v4l2 3H5l2-3V9Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
