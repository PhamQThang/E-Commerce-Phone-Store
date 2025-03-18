import { Router } from "express";
import { addSupplier, updateSupplier, deleteSupplier, getSuppliers } from "../controllers/supplierController";

const router = Router();

router.get("/list", getSuppliers);
router.post("/add", addSupplier);
router.put("/:supplier_id", updateSupplier);
router.delete("/:supplier_id", deleteSupplier);

export default router;