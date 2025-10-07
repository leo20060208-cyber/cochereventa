"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20",
            "animate-pulse"
          )}
        />
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-tr from-indigo-500/30 via-blue-600/30 to-violet-500/30",
            "animate-pulse",
            "delay-1000"
          )}
        />
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-bl from-cyan-400/25 via-blue-500/25 to-indigo-600/25",
            "animate-pulse",
            "delay-2000"
          )}
        />
        
        {/* Animated Aurora Effect */}
        <div
          className={cn(
            "absolute inset-0 opacity-60",
            "bg-gradient-to-r from-transparent via-blue-400/40 to-transparent",
            "animate-aurora"
          )}
        />
        
        {/* Radial Gradient Overlay */}
        {showRadialGradient && (
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-radial from-transparent via-blue-500/10 to-blue-900/20"
            )}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};