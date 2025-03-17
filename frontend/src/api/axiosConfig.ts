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
};

export { axiosInstance, setAuthToken, api };