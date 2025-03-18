"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSuppliers } from "@/api/supplierApi";

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

export default function EditSupplier() {
  const { supplier_id } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [supplier_name, setSupplierName] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const suppliers = await getSuppliers();
        const foundSupplier = suppliers.find((sup: Supplier) => sup.supplier_id === parseInt(supplier_id as string));
        if (!foundSupplier) {
          throw new Error("Nhà cung cấp không tồn tại.");
        }
        setSupplier(foundSupplier);
        setSupplierName(foundSupplier.supplier_name);
        setContactPerson(foundSupplier.contact_person || "");
        setPhoneNumber(foundSupplier.phone_number);
        setEmail(foundSupplier.email || "");
        setAddress(foundSupplier.address);
        setStatus(foundSupplier.status);
        setNotes(foundSupplier.notes || "");
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchSupplier();
  }, [supplier_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.updateSupplier(parseInt(supplier_id as string), {
        supplier_name,
        contact_person,
        phone_number,
        email,
        address,
        status,
        notes,
      });
      alert("Cập nhật nhà cung cấp thành công!");
      router.push("/admin/suppliers/list");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="p-6">Lỗi: {error}</div>;
  }

  if (!supplier) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa nhà cung cấp</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên nhà cung cấp</label>
          <input
            type="text"
            value={supplier_name}
            onChange={(e) => setSupplierName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Người liên hệ</label>
          <input
            type="text"
            value={contact_person}
            onChange={(e) => setContactPerson(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Địa chỉ</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Ghi chú</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Cập nhật nhà cung cấp
        </button>
      </form>
    </div>
  );
}