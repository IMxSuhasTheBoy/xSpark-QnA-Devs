"use client";

import React from "react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // session existance check
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
      <div>
        {/* register page, login page  */}
        {children}
      </div>
    </div>
  );
};
export default Layout;
