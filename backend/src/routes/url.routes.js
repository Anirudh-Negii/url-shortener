import express from "express";
import { createUrl, getUrls, deleteUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", createUrl);
router.get("/", getUrls);
router.delete("/:id", deleteUrl);

export default router;