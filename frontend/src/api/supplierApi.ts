import axios from 'axios';
import axiosInstance from './axiosConfig';

export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get('/suppliers/list');
    if (!response.data.success) {
      throw new Error(response.data.message || "Không thể lấy danh sách nhà cung cấp.");
    }
    return response.data.suppliers;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    } else {
      throw error;
    }
  }
};

export const addSupplier = async (supplierData: { supplier_name: string; contact_person?: string; phone_number: string; email?: string; address: string; status?: string; notes?: string }) => {
    try {
      const response = await axiosInstance.post('/suppliers/add', supplierData);
      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể thêm nhà cung cấp.");
      }
      return response.data.supplier;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || error.message;
      } else {
        throw error;
      }
    }
  };

  export const updateSupplier = async (supplier_id: number, supplierData: { supplier_name: string; contact_person?: string; phone_number: string; email?: string; address: string; status?: string; notes?: string }) => {
    try {
      const response = await axiosInstance.put(`/suppliers/${supplier_id}`, supplierData);
      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể cập nhật nhà cung cấp.");
      }
      return response.data.supplier;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || error.message;
      } else {
        throw error;
      }
    }
  };

  export const deleteSupplier = async (supplier_id: number) => {
    try {
      const response = await axiosInstance.delete(`/suppliers/${supplier_id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể xóa nhà cung cấp.");
      }
      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || error.message;
      } else {
        throw error;
      }
    }
  };
