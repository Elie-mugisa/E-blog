import express from "express";

import { authGuard, adminGuard } from "./../middlewares/authMiddleware.js";
import {
  createPost,
  updatetePost,
  deletePost,
  getPost,
  getAllPost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatetePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
