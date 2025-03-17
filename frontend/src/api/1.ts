import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers['Authorization'];
  }
};

const api = {
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      const { role, full_name } = response.data; // Bỏ token vì không trả về
      localStorage.setItem('role', role);
      localStorage.setItem('full_name', full_name);
      return { role, full_name };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  register: async (full_name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        full_name,
        email,
        password,
      });
      const { role, full_name: fullName } = response.data; // Bỏ token
      localStorage.setItem('role', role);
      localStorage.setItem('full_name', fullName);
      return { role, full_name: fullName };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      localStorage.removeItem('role');
      localStorage.removeItem('full_name');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  checkAdminAccess: async () => {
    try {
      const response = await axiosInstance.get('/auth/admin/protected');
      const { role, full_name } = response.data;
      return { role, full_name };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  getCategories: async () => {
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
  },

  addCategory: async (categoryData: { category_name: string; description?: string; is_active?: boolean; display_order?: number }) => {
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
  },

  updateCategory: async (category_id: number, categoryData: { category_name: string; description?: string; is_active?: boolean; display_order?: number }) => {
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
  },

  deleteCategory: async (category_id: number) => {
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
  },


  getSuppliers: async () => {
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
  },

  addSupplier: async (supplierData: { supplier_name: string; contact_person?: string; phone_number: string; email?: string; address: string; status?: string; notes?: string }) => {
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
  },

  updateSupplier: async (supplier_id: number, supplierData: { supplier_name: string; contact_person?: string; phone_number: string; email?: string; address: string; status?: string; notes?: string }) => {
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
  },

  deleteSupplier: async (supplier_id: number) => {
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
  },
  
};

export { axiosInstance, setAuthToken, api };