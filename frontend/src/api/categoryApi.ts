import axios from 'axios';
import axiosInstance from './axiosConfig';

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories/list');
    if (!response.data.success) {
      throw new Error(response.data.message || "Không thể lấy danh sách danh mục.");
    }
    return response.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    } else {
      throw error;
    }
  }
};

export const addCategory = async (categoryData: { category_name: string; description?: string; is_active?: boolean; display_order?: number }) => {
    try {
      const response = await axiosInstance.post('/categories/add', categoryData);
      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể thêm danh mục.");
      }
      return response.data.category;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || error.message;
      } else {
        throw error;
      }
    }
  };
  
  export const updateCategory = async (category_id: number, categoryData: { category_name: string; description?: string; is_active?: boolean; display_order?: number }) => {
    try {
      const response = await axiosInstance.put(`/categories/${category_id}`, categoryData);
      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể cập nhật danh mục.");
      }
      return response.data.category;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || error.message;
      } else {
        throw error;
      }
    }
  };

  export const deleteCategory = async (category_id: number) => {
    try {
      const response = await axiosInstance.delete(`/categories/${category_id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể xóa danh mục.");
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