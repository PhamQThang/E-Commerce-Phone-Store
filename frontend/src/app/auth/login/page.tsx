"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/api/axiosConfig";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const emailFromQuery = searchParams.get("email") || "";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromQuery, 
      password: "",
    },
  });

  useEffect(() => {
    form.setValue("email", emailFromQuery);
  }, [emailFromQuery, form]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);
    try {
      const response = await api.login(values.email, values.password);
      const { role } = response;

      if (role) {
        localStorage.setItem("role", role);
        toast.success("Đăng nhập thành công", {
          description: `Chào mừng ${role === "admin" ? "Admin" : "Khách hàng"}!`,
          duration: 1000,
        });
          if (role === "admin") {
            router.push("/admin");
          } else {
            router.push("/client");
          }
      } else {
        setError("Đăng nhập thất bại: Không nhận được vai trò từ server.");
        toast.error("Đăng nhập thất bại", {
          description: "Vui lòng kiểm tra email hoặc mật khẩu.",
          duration: 1000,
        });
      }
    } catch (error: any) {
      setError(error.message || "Đã có lỗi xảy ra trong quá trình đăng nhập.");
      toast.error("Đăng nhập thất bại", {
        description: error.message || "Vui lòng thử lại sau.",
        duration: 1000,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng nhập thông tin để đăng nhập
          </p>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}