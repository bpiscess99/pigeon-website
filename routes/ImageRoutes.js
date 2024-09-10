import express from "express";
import { isadmin, requiresingnin } from "../middlewares/Authmiddleware.js";
import {
  addImage,
  deleteImage,
  getImages,
  uploadImage,
} from "../controllers/imageController.js";
const router = express.Router();

router
  .route("/")
  .post(requiresingnin, isadmin, uploadImage, addImage)
  .get(getImages);

router.delete("/:id", requiresingnin, isadmin, deleteImage);

export default router;
