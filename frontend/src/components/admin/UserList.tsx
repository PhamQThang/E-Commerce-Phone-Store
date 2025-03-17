import React from "react";
// import { api } from "@/api/axiosConfig";
import { Button } from "../ui/button";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
}

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onEdit }) => {
  // const handleDelete = async (id: number) => {
  //   try {
  //     await api.delete(`/users/${id}`); // API xóa người dùng
  //     onDelete(id);
  //   } catch (error) {
  //     console.error("Error deleting user", error);
  //   }
  // };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <p className="font-semibold">{user.full_name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => onEdit(user)}
              className="mr-2"
            >
              Sửa
            </Button>
            <Button variant="outline" color="danger">
            {/* <Button variant="outline" color="danger" onClick={() => handleDelete(user.id)}> */}
              Xóa
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
