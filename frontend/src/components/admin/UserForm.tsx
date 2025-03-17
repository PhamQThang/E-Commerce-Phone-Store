import React, { useEffect, useState } from "react";
// import { api } from "@/api/axiosConfig";
import { Button } from "../ui/button";

interface User {
  id?: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string; // Thêm địa chỉ nếu cần
}

interface UserFormProps {
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const [formData, setFormData] = useState<User>({
    full_name: "",
    email: "",
    phone: "",
    address: "", // Đảm bảo có địa chỉ nếu bạn muốn
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // try {
    //   if (user?.id) {
    //     // Cập nhật người dùng
    //     await api.put(`/users/${user.id}`, formData);
    //   } else {
    //     // Thêm mới người dùng
    //     await api.post("/users", formData);
    //   }
    //   onSuccess();
    //   onClose();
    // } catch (error) {
    //   console.error("Error saving user", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
        <textarea
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <Button type="submit" variant="default" className="w-full">
        {user?.id ? "Cập nhật" : "Thêm mới"}
      </Button>
    </form>
  );
};
