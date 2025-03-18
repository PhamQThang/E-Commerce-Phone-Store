import { Router } from "express";
import { addCategory, updateCategory, deleteCategory, getCategories } from "../controllers/categoryController";

const router = Router();

router.get("/list", getCategories);

router.post("/add", addCategory);

router.put("/:category_id", updateCategory);

router.delete("/:category_id", deleteCategory);

export default router;