import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { full_name, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      res.status(400).json({ message: 'Email đã tồn tại' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO users (full_name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, email, hashedPassword, 'active']
    );

    const newUser = result.rows[0];

    const defaultRole = await pool.query(
      'SELECT role_id FROM roles WHERE role_name = $1',
      ['client']
    );

    if (defaultRole.rows.length === 0) {
      res.status(500).json({ message: 'Không tìm thấy vai trò mặc định "client".' });
      return;
    }

    await pool.query(
      'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
      [newUser.user_id, defaultRole.rows[0].role_id]
    );

    const token = jwt.sign(
      { id: newUser.user_id, full_name: newUser.full_name, role: 'client' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res
      .status(201)
      .cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000,
        sameSite: 'lax',
      })
      .json({ message: 'Đăng ký thành công', role: 'client', full_name: newUser.full_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server: Không thể đăng ký tài khoản.' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
      res.status(400).json({ message: 'Email không tồn tại' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Mật khẩu không chính xác' });
      return;
    }

    const roleResult = await pool.query(
      `
      SELECT r.role_name
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.role_id
      WHERE ur.user_id = $1
      `,
      [user.user_id]
    );

    const role = roleResult.rows[0]?.role_name || 'client';

    const token = jwt.sign(
      { id: user.user_id, full_name: user.full_name, role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res
      .status(200)
      .cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000,
        sameSite: 'lax',
      })
      .json({ message: 'Đăng nhập thành công', role, full_name: user.full_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server: Không thể đăng nhập.' });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res
    .status(200)
    .cookie('authToken', '', { maxAge: 0 })
    .json({ message: 'Đăng xuất thành công' });
};

export const checkAdminAccess = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).json({ message: 'Không tìm thấy token, vui lòng đăng nhập.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      full_name: string;
      role: string;
      exp: number;
    };

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      res.status(401).json({ message: 'Token đã hết hạn, vui lòng đăng nhập lại.' });
      return;
    }

    if (decoded.role !== 'admin') {
      res.status(403).json({ message: 'Bạn không có quyền truy cập vào tài nguyên này.' });
      return;
    }

    res.status(200).json({ message: 'Chào mừng Admin!', role: decoded.role, full_name: decoded.full_name });
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ, vui lòng đăng nhập lại.' });
  }
};