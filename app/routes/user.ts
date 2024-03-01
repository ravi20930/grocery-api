import express, { Router } from "express";
import {
  createOrder,
  getProfile,
  getTopSellingBooks,
  uploadImages,
} from "../controllers/user";

const router: Router = express.Router();

router.post("/create-order", createOrder);

router.get("/", getProfile);
router.get("/top-sellers", getTopSellingBooks);

export default router;
