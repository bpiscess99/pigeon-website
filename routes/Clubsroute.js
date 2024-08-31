import express from "express";
import { requiresingnin } from "../middlewares/Authmiddleware.js";
import {
  deleteClubController,
  getAllClubsController,
  getClubBySlugController,
  logincontroller,
  registercontroller,
  testcontroller,
  updateClubController,
} from "../controllers/Clubscontroller.js";

const router = express.Router();

router.post("/register", registercontroller);
router.get("/clubs", getAllClubsController);
router
  .route("/clubs/:id")
  .put(updateClubController)
  .delete(deleteClubController);

router.post("/login", logincontroller);
router.get("/clubs/:slug", getClubBySlugController);

// working above
router.get("/test", requiresingnin, testcontroller);
router.get("/user-auth", requiresingnin, (req, res) => {
  res.status(201).send({ ok: true });
});

export default router;
