"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, History, Settings, CodeXml } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggleButton } from "./theme-toggle-button";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat Scraper", icon: Bot },
  { href: "/history", label: "Scrape History", icon: History },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="border-r" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Bot className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">AetherScrape</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, className: "group-data-[collapsible=icon]:block hidden" }}
                  className={cn(
                    "justify-start",
                    pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
            <div className="flex flex-col gap-2 group-data-[collapsible=icon]:items-center">
                 <Separator className="my-2 group-data-[collapsible=icon]:hidden"/>
                <div className="flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
                    <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">© 2024 AetherScrape</p>
                    <ThemeToggleButton />
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-sm md:hidden">
            <SidebarTrigger />
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <Bot className="h-6 w-6 text-primary" />
                AetherScrape
            </Link>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
