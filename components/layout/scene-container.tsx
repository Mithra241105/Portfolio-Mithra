import React from 'react';
import { cn } from '@/lib/utils';

interface SceneContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SceneContainer = ({ children, className, ...props }: SceneContainerProps) => {
  return (
    <div 
      className={cn("relative min-h-screen w-full overflow-hidden perspective-1000", className)} 
      {...props}
    >
      {/* 3D or Parallax Background Context could be injected here */}
      <div className="absolute inset-0 bg-wood z-0" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
