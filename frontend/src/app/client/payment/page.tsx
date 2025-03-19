"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="container w-full mx-auto p-6 bg-gray-100 min-h-screen space-y-6">
      <h2 className="text-2xl font-bold text-center ">Thanh toán đơn hàng</h2>

      {/* Thông tin giao hàng */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <Card className="border border-yellow-400">
            <CardHeader>
              <CardTitle>Thông tin giao hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="text" placeholder="Họ và tên *" required />
              <Input type="tel" placeholder="Số điện thoại *" required />
              <Input type="email" placeholder="Địa chỉ Email *" required />
              <Input type="text" placeholder="Địa chỉ *" required />
              <Textarea placeholder="Ghi chú đơn hàng (tuỳ chọn)" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-6 ">
          <Card className="border border-yellow-400">
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                iPhone 14 Pro Max 128GB - <span className="text-red-600">17.500.000 ₫</span>
              </p>
              <p className="font-bold text-lg mt-2">Tổng: 17.500.000 ₫</p>
            </CardContent>
          </Card>

          <Card className="border border-yellow-400 mt-6">
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setPaymentMethod(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn phương thức thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">Trả tiền mặt khi nhận hàng</SelectItem>
                  <SelectItem value="bank">Chuyển khoản ngân hàng</SelectItem>
                  <SelectItem value="momo">Ví điện tử Momo</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardContent>
              <Button className="w-full bg-red-600 text-white font-bold text-lg">
                ĐẶT HÀNG - {paymentMethod === "cod" ? "Tiền mặt" : paymentMethod === "bank" ? "Chuyển khoản" : "Momo"}
              </Button>
            </CardContent>
          </Card>          
        </div>
      </div>
    </div>
  );
};

export default Payment;
