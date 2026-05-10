"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-background/60 px-6 backdrop-blur-xl md:px-10">
      <div className="flex items-center gap-4">
        {/* Spacer for mobile menu button */}
        <div className="w-12 md:hidden" />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="transition-colors hover:text-primary font-medium text-muted-foreground">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {paths.map((path, index) => {
              const href = `/${paths.slice(0, index + 1).join("/")}`;
              const isLast = index === paths.length - 1;
              const title = path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");

              if (path.toLowerCase() === "dashboard" && index === 0) return null;

              return (
                <React.Fragment key={path}>
                  <BreadcrumbSeparator className="opacity-40" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-bold text-foreground tracking-tight">{title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href} className="transition-colors hover:text-primary font-medium text-muted-foreground">{title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-lg font-black tracking-tighter sm:hidden">
          {paths[paths.length - 1]?.charAt(0).toUpperCase() + paths[paths.length - 1]?.slice(1).replace("-", " ") || "DASHBOARD"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live System</span>
        </div>
        <div className="h-10 w-10 flex items-center justify-center rounded-full border bg-card/50 shadow-sm">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
