"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/admin/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { api } from "@/api/axiosConfig";
import Header from "@/components/common/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn");
    const role = localStorage.getItem("role");

    const checkAdminAccess = async () => {
      try {
        const response = await api.checkAdminAccess(); // Gọi API để backend xác thực
        const { role: verifiedRole } = response;

        if (verifiedRole !== "admin") {
          const redirectUrl = verifiedRole === "client" ? "/client" : "/client";
          if (!justLoggedIn) {
            toast.error("Bạn không có quyền truy cập trang này", {
              description: `Đang chuyển hướng đến ${redirectUrl}...`,
              duration: 3000,
            });
          }
          router.push(redirectUrl);
          return;
        }

        setIsAuthorized(true);
      } catch (err: any) {
        if (!justLoggedIn) {
          if (err.message === "Không tìm thấy token, vui lòng đăng nhập." || err.message === "Token không hợp lệ, vui lòng đăng nhập lại.") {
            toast.error(err.message, {
              description: "Đang chuyển hướng đến trang đăng nhập...",
              duration: 3000,
            });
            router.push("/auth/login");
          } else {
            toast.error(err.message || "Không thể xác thực", {
              description: "Vui lòng thử lại sau...",
              duration: 3000,
            });
          }
        }
      } finally {
        setIsLoading(false);
        localStorage.removeItem("justLoggedIn");
      }
    };

    if (role) {
      checkAdminAccess();
    } else {
      if (!justLoggedIn) {
        toast.error("Bạn cần đăng nhập để truy cập trang này", {
          description: "Đang chuyển hướng đến trang đăng nhập...",
          duration: 3000,
        });
      }
      router.push("/auth/login");
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
  }

  if (!isAuthorized) {
    return null;
  }
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
          <AppSidebar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}