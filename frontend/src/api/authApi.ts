import axios from 'axios';
import axiosInstance from './axiosConfig';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const { role, full_name } = response.data;
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
};

export const register = async (full_name: string, email: string, password: string) => {
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
  };
  
  export const logout = async () => {
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
  };

  export const checkAdminAccessAPI = async () => {
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
  };
