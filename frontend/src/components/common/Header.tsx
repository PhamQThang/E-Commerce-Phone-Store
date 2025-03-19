"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { LogOutIcon, ShoppingCart } from "lucide-react";
import { logout } from "@/api/authApi";
import Image from "next/image";

interface DecodedToken {
  id: number;
  full_name: string;
  role: string;
  iat: number;
  exp: number;
}

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedFullName = localStorage.getItem("full_name");

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          handleLogout();
          return;
        }

        setIsLoggedIn(true);
        setRole(decoded.role);
        setFullName(decoded.full_name);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("full_name", decoded.full_name);
      } catch (err) {
        console.error("Token không hợp lệ:", err);
        handleLogout();
      }
    } else {
      setIsLoggedIn(!!storedRole);
      setRole(storedRole);
      setFullName(storedFullName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("role");
      localStorage.removeItem("full_name");
      setIsLoggedIn(false);
      setRole(null);
      setFullName(null);

      toast.success("Đăng xuất thành công", {
        description: "Bạn đã được đăng xuất.",
        duration: 500,
      });

      setTimeout(() => router.push("/client"), 100);
    } catch (error: any) {
      toast.error("Đăng xuất thất bại", {
        description: error.message || "Vui lòng thử lại.",
        duration: 3000,
      });
    }
  };

  const getInitial = (name: string | null) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        <Link href={role === "admin" ? "/admin" : "/client"}>
          <Image src="/image/logo.png" alt="Fixi Mobile" width={40} height={40} />
        </Link>
        <div className="flex items-center space-x-4">
        <Link href="/client/cart" className="relative flex items-center gap-2">
          <ShoppingCart className="text-red-500 text-2xl" />
          <span>Giỏ hàng</span>
        </Link>
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {getInitial(fullName)}
                </div>
                <span className="text-sm font-medium text-blue-600">
                  Xin chào, {fullName || "Người dùng"}
                </span>
              </div>
              <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
                <LogOutIcon className="w-4 h-4" />
                <span>Đăng xuất</span>
              </Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline">Đăng nhập</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}