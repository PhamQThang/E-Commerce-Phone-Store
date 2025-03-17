"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCategories, updateCategory } from "@/api/categoryApi";

interface Category {
  category_id: number;
  category_name: string;
  description: string | null;
  is_active: boolean;
  display_order: number | null;
}

export default function EditCategory() {
  const { category_id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [category_name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [display_order, setDisplayOrder] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategories();
        const foundCategory = categories.find((cat: Category) => cat.category_id === parseInt(category_id as string));
        if (!foundCategory) {
          throw new Error("Danh mục không tồn tại.");
        }
        setCategory(foundCategory);
        setCategoryName(foundCategory.category_name);
        setDescription(foundCategory.description || "");
        setIsActive(foundCategory.is_active);
        setDisplayOrder(foundCategory.display_order ?? "");
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCategory();
  }, [category_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCategory(parseInt(category_id as string), {
        category_name,
        description,
        is_active,
        display_order: display_order === "" ? undefined : display_order,
      });
      alert("Cập nhật danh mục thành công!");
      router.push("/admin/categories/list");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="p-6">Lỗi: {error}</div>;
  }

  if (!category) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa danh mục</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên danh mục</label>
          <input
            type="text"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Trạng thái</label>
          <select
            value={is_active.toString()}
            onChange={(e) => setIsActive(e.target.value === "true")}
            className="w-full border p-2 rounded"
          >
            <option value="true">Hoạt động</option>
            <option value="false">Không hoạt động</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Thứ tự hiển thị</label>
          <input
            type="number"
            value={display_order}
            onChange={(e) => setDisplayOrder(e.target.value === "" ? "" : parseInt(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Cập nhật danh mục
        </button>
      </form>
    </div>
  );
}