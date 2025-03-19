import React, { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CartItemProps {
  id: string;
  images: string[];
  title: string;
  newPrice: string;
  quantity: number;
  isChecked: boolean;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onToggleSelect: (id: string, isChecked: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, images, title, newPrice, quantity, isChecked, onRemove, onUpdateQuantity, onToggleSelect }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const thumbnail = images.length > 0 ? images[0] : "/image/default.png";

  const priceNumber = parseFloat(newPrice.replace(/\D/g, ""));
  const subtotal = priceNumber * itemQuantity;

  const handleQuantityChange = (amount: number) => {
    const newQuantity = itemQuantity + amount;
    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex sm:grid sm:grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-4 border-b border-gray-300">
      {/* Cột 1: Ảnh, Tên, Checkbox */}
      <div className="col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
        <Input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onToggleSelect(id, e.target.checked)}
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
        <Image src={thumbnail} alt={title} width={48} height={48} className="w-12 h-12 sm:w-20 sm:h-20 rounded-md" />
        <h3 className="text-sm sm:text-lg font-semibold">{title}</h3>
      </div>

      {/* Cột 2: Giá */}
      <div className="col-span-2 flex items-center justify-center text-red-500 font-bold text-sm sm:text-base">{newPrice}₫</div>

      {/* Cột 3: Điều chỉnh số lượng */}
      <div className="col-span-2 flex items-center justify-center gap-1 sm:gap-2">
        <Button onClick={() => handleQuantityChange(-1)} className="py-0.5 sm:!px-1 sm:py-1 border rounded-l text-black bg-gray-100 hover:bg-gray-200">-</Button>
        <p className="text-sm sm:text-base">{itemQuantity}</p>
        <Button onClick={() => handleQuantityChange(1)} className=" py-0.5 sm:!px-1 sm:py-1 border rounded-r text-black bg-gray-100 hover:bg-gray-200">+</Button>
      </div>

      {/* Cột 4: Tổng giá */}
      <p className="col-span-2 hidden sm:flex items-center justify-center text-sm sm:text-lg font-semibold">{subtotal.toLocaleString()}₫</p>

      {/* Cột 5: Xóa */}
      <div className="col-span-1 flex items-center justify-center">
        <Button onClick={() => onRemove(id)} className="text-red-500 bg-transparent hover:text-white p-1 sm:p-2">
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>   
    </div>
  );
};

export default CartItem;
