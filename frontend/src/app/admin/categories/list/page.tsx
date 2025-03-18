"use client";

import { deleteCategory, getCategories } from "@/api/categoryApi";
import { useEffect, useState } from "react";

interface Category {
  category_id: number;
  category_name: string;
  description: string | null;
  is_active: boolean;
  display_order: number | null;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (category_id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    try {
      const message = await deleteCategory(category_id);
      alert(message);
      fetchCategories();
    } catch (err: any) {
      alert("Lỗi: " + err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (error) {
    return <div className="p-6">Lỗi: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách danh mục</h1>
      <a href="/admin/categories/add" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Thêm danh mục mới
      </a>
      {categories.length === 0 ? (
        <p>Không có danh mục nào.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Tên danh mục</th>
              <th className="border p-2">Mô tả</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Thứ tự hiển thị</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.category_id}>
                <td className="border p-2">{category.category_id}</td>
                <td className="border p-2">{category.category_name}</td>
                <td className="border p-2">{category.description || "N/A"}</td>
                <td className="border p-2">{category.is_active ? "Hoạt động" : "Không hoạt động"}</td>
                <td className="border p-2">{category.display_order ?? "N/A"}</td>
                <td className="border p-2">
                  <a href={`/admin/categories/edit/${category.category_id}`} className="mr-2 text-blue-500">
                    Sửa
                  </a>
                  <button onClick={() => handleDelete(category.category_id)} className="text-red-500">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}