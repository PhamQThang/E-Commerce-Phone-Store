"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/api/categoryApi";

export default function AddCategory() {
  const [category_name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [display_order, setDisplayOrder] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCategory({
        category_name,
        description,
        is_active,
        display_order: display_order === "" ? undefined : display_order,
      });
      alert("Thêm danh mục thành công!");
      router.push("/admin/categories/list");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm danh mục mới</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
          Thêm danh mục
        </button>
      </form>
    </div>
  );
}