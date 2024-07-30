"use client";

import React from "react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";

import { BackgroundBeams } from "@/components/ui/background-beams";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // check session existance
  const { session } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div>
      <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
        <BackgroundBeams />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
