'use client'

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen p-2">
        <SidebarTrigger />
        <div className="w-full h-full">
            {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
