"use client";

import { deleteSupplier, getSuppliers } from "@/api/supplierApi";
import { useEffect, useState } from "react";

interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_person: string | null;
  phone_number: string;
  email: string | null;
  address: string;
  status: string;
  created_at: string;
  notes: string | null;
}

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (supplier_id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) return;

    try {
      const message = await deleteSupplier(supplier_id);
      alert(message);
      fetchSuppliers();
    } catch (err: any) {
      alert("Lỗi: " + err.message);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  if (error) {
    return <div className="p-6">Lỗi: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách nhà cung cấp</h1>
      <a href="/admin/suppliers/add" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Thêm nhà cung cấp mới
      </a>
      {suppliers.length === 0 ? (
        <p>Không có nhà cung cấp nào.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Tên nhà cung cấp</th>
              <th className="border p-2">Người liên hệ</th>
              <th className="border p-2">Số điện thoại</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Địa chỉ</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id}>
                <td className="border p-2">{supplier.supplier_id}</td>
                <td className="border p-2">{supplier.supplier_name}</td>
                <td className="border p-2">{supplier.contact_person || "N/A"}</td>
                <td className="border p-2">{supplier.phone_number}</td>
                <td className="border p-2">{supplier.email || "N/A"}</td>
                <td className="border p-2">{supplier.address}</td>
                <td className="border p-2">{supplier.status}</td>
                <td className="border p-2">
                  <a href={`/admin/suppliers/edit/${supplier.supplier_id}`} className="mr-2 text-blue-500">
                    Sửa
                  </a>
                  <button onClick={() => handleDelete(supplier.supplier_id)} className="text-red-500">
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