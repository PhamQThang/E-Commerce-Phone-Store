"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/api/axiosConfig"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  category_id: number;
  category_name: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories"); // Gọi API để lấy danh mục
        const data: Category[] = response.data;
        const activeCategories = data
          .filter((category) => category.is_active)
          .sort((a, b) => a.display_order - b.display_order);
        setCategories(activeCategories);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh mục: " + (err as Error).message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-gray-600">Đang tải danh mục...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12">
      <div className="w-full max-w-5xl space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Danh mục sản phẩm</h1>
          <p className="mt-2 text-sm text-gray-600">
            Khám phá các danh mục sản phẩm tại Fiximobile
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.category_id}
              className="hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {category.category_name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/category/${category.category_id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Xem sản phẩm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Quay lại{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}