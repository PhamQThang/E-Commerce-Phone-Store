import { Request, Response } from "express";
import pool from "../db";

// Thêm danh mục mới
export const addCategory = async (req: Request, res: Response): Promise<void> => {
  const { category_name, description, is_active, display_order } = req.body;

  try {
    if (!category_name) {
      res.status(400).json({ success: false, message: "Tên danh mục là bắt buộc." });
      return;
    }

    const result = await pool.query(
      "INSERT INTO categories (category_name, description, is_active, display_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        category_name,
        description || null,
        is_active !== undefined ? is_active : true,
        display_order !== undefined ? display_order : null,
      ]
    );

    const newCategory = result.rows[0];
    res.status(201).json({ success: true, message: "Thêm danh mục thành công", category: newCategory });
  } catch (error: any) {
    console.error("Error in addCategory:", error);
    if (error.code === "23505") {
      res.status(400).json({ success: false, message: "Tên danh mục đã tồn tại." });
      return;
    }
    res.status(500).json({ success: false, message: "Lỗi server: Không thể thêm danh mục." });
  }
};

// Sửa danh mục
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { category_id } = req.params;
  const { category_name, description, is_active, display_order } = req.body;

  try {
    if (!category_id || !category_name) {
      res.status(400).json({ success: false, message: "ID danh mục và tên danh mục là bắt buộc." });
      return;
    }

    const categoryExists = await pool.query("SELECT * FROM categories WHERE category_id = $1", [
      category_id,
    ]);
    if (categoryExists.rows.length === 0) {
      res.status(404).json({ success: false, message: "Danh mục không tồn tại." });
      return;
    }

    const result = await pool.query(
      "UPDATE categories SET category_name = $1, description = $2, is_active = $3, display_order = $4 WHERE category_id = $5 RETURNING *",
      [
        category_name,
        description || null,
        is_active !== undefined ? is_active : categoryExists.rows[0].is_active,
        display_order !== undefined ? display_order : categoryExists.rows[0].display_order,
        category_id,
      ]
    );

    const updatedCategory = result.rows[0];
    res.status(200).json({ success: true, message: "Cập nhật danh mục thành công", category: updatedCategory });
  } catch (error: any) {
    console.error("Error in updateCategory:", error);
    if (error.code === "23505") {
      res.status(400).json({ success: false, message: "Tên danh mục đã tồn tại." });
      return;
    }
    res.status(500).json({ success: false, message: "Lỗi server: Không thể cập nhật danh mục." });
  }
};

// Xóa danh mục
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { category_id } = req.params;

  try {
    if (!category_id) {
      res.status(400).json({ success: false, message: "ID danh mục là bắt buộc." });
      return;
    }

    const categoryExists = await pool.query("SELECT * FROM categories WHERE category_id = $1", [
      category_id,
    ]);
    if (categoryExists.rows.length === 0) {
      res.status(404).json({ success: false, message: "Danh mục không tồn tại." });
      return;
    }

    await pool.query("DELETE FROM categories WHERE category_id = $1", [category_id]);
    res.status(200).json({ success: true, message: "Xóa danh mục thành công." });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ success: false, message: "Lỗi server: Không thể xóa danh mục." });
  }
};

// Lấy danh sách danh mục
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY display_order ASC, category_id DESC");
    res.status(200).json({ success: true, categories: result.rows });
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ success: false, message: "Lỗi server: Không thể lấy danh sách danh mục." });
  }
};