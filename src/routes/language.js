import express from "express";
import { create, get, getAll, remove, update } from "../controllers/language";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/language", getAll);
router.get("/language/:id", get);
router.post("/language", checkPermission, create);
router.delete("/language/:id", checkPermission, remove);
router.patch("/language/:id", checkPermission, update);

export default router;