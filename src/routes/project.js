import express from "express";
import { create, get, getAll, remove, update } from "../controllers/project";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/projects", getAll);
router.get("/projects/:id", get);
router.post("/projects", checkPermission, create);
router.delete("/projects/:id", checkPermission, remove);
router.patch("/projects/:id", checkPermission, update);

export default router;