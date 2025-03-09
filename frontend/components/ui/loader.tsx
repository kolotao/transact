import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

export const Loader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-spin inline-block size-5 border-3 border-current border-t-transparent text-card-foreground rounded-full',
        className
      )}
      role="status"
      aria-label="loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
