import { Request, Response } from 'express';
import pool from '../db'; // Kết nối cơ sở dữ liệu PostgreSQL

// Lấy danh sách người dùng
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Người dùng không tìm thấy');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};

// Thêm người dùng
export const createUser = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [full_name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { full_name, email, password } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET full_name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [full_name, email, password, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Người dùng không tìm thấy');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};

// Xóa người dùng
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Người dùng không tìm thấy');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};
