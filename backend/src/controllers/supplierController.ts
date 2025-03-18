import { Request, Response } from "express";
import pool from "../db";

// Thêm nhà cung cấp mới
export const addSupplier = async (req: Request, res: Response): Promise<void> => {
  const { supplier_name, contact_person, phone_number, email, address, status, notes } = req.body;

  try {
    if (!supplier_name || !phone_number || !address) {
      res.status(400).json({ success: false, message: "Tên nhà cung cấp, số điện thoại và địa chỉ là bắt buộc." });
      return;
    }
    if (status && !["active", "inactive"].includes(status)) {
      res.status(400).json({ success: false, message: "Trạng thái phải là 'active' hoặc 'inactive'." });
      return;
    }

    const result = await pool.query(
      "INSERT INTO suppliers (supplier_name, contact_person, phone_number, email, address, status, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        supplier_name,
        contact_person || null,
        phone_number,
        email || null,
        address,
        status || "active",
        notes || null,
      ]
    );

    const newSupplier = result.rows[0];
    res.status(201).json({ success: true, message: "Thêm nhà cung cấp thành công", supplier: newSupplier });
  } catch (error: any) {
    console.error("Error in addSupplier:", error);
    res.status(500).json({ success: false, message: "Lỗi server: Không thể thêm nhà cung cấp." });
  }
};

// Sửa nhà cung cấp
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  const { supplier_id } = req.params;
  const { supplier_name, contact_person, phone_number, email, address, status, notes } = req.body;

  try {
    if (!supplier_id || !supplier_name || !phone_number || !address) {
      res.status(400).json({ success: false, message: "ID, tên nhà cung cấp, số điện thoại và địa chỉ là bắt buộc." });
      return;
    }
    if (status && !["active", "inactive"].includes(status)) {
      res.status(400).json({ success: false, message: "Trạng thái phải là 'active' hoặc 'inactive'." });
      return;
    }

    const supplierExists = await pool.query("SELECT * FROM suppliers WHERE supplier_id = $1", [supplier_id]);
    if (supplierExists.rows.length === 0) {
      res.status(404).json({ success: false, message: "Nhà cung cấp không tồn tại." });
      return;
    }

    const result = await pool.query(
      "UPDATE suppliers SET supplier_name = $1, contact_person = $2, phone_number = $3, email = $4, address = $5, status = $6, notes = $7 WHERE supplier_id = $8 RETURNING *",
      [
        supplier_name,
        contact_person || null,
        phone_number,
        email || null,
        address,
        status || supplierExists.rows[0].status,
        notes || null,
        supplier_id,
      ]
    );

    const updatedSupplier = result.rows[0];
    res.status(200).json({ success: true, message: "Cập nhật nhà cung cấp thành công", supplier: updatedSupplier });
  } catch (error: any) {
    console.error("Error in updateSupplier:", error);
    res.status(500).json({ success: false, message: "Lỗi server: Không thể cập nhật nhà cung cấp." });
  }
};

// Xóa nhà cung cấp
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  const { supplier_id } = req.params;

  try {
    if (!supplier_id) {
      res.status(400).json({ success: false, message: "ID nhà cung cấp là bắt buộc." });
      return;
    }

    const supplierExists = await pool.query("SELECT * FROM suppliers WHERE supplier_id = $1", [supplier_id]);
    if (supplierExists.rows.length === 0) {
      res.status(404).json({ success: false, message: "Nhà cung cấp không tồn tại." });
      return;
    }

    await pool.query("DELETE FROM suppliers WHERE supplier_id = $1", [supplier_id]);
    res.status(200).json({ success: true, message: "Xóa nhà cung cấp thành công." });
  } catch (error) {
    console.error("Error in deleteSupplier:", error);
    res.status(500).json({ success: false, message: "Lỗi server: Không thể xóa nhà cung cấp." });
  }
};

// Lấy danh sách nhà cung cấp
export const getSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM suppliers ORDER BY supplier_id DESC");
    res.status(200).json({ success: true, suppliers: result.rows });
  } catch (error) {
    console.error("Error in getSuppliers:", error);
    res.status(500).json({ success: false, message: "Lỗi server: Không thể lấy danh sách nhà cung cấp." });
  }
};