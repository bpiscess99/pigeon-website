// routes/employeeRoutes.js
import express from "express";
import {
  createOwner,
  deleteOwner,
  getallowner,
  getOwner,
  updateOwner,
  uploadImage,
  createPegionResults,
  getPigeonOwnersOfTournament,
} from "../controllers/Pigeonownercontroller.js";

const router = express.Router();

router.post("/owner", uploadImage, createOwner);

router.get("/owners", getOwner);

router.get("/pigeonOwners/:tournamentId", getPigeonOwnersOfTournament);

// get pegion results
router.get("/allowners", getallowner);

// Update Owner Route
router.put("/owners/:id", updateOwner);

// Delete Owner Route
router.delete("/owners/:id", deleteOwner);

// router.put('/employees/:id',updateEmployee);
// router.delete('/employees/:id',deleteEmployee);
router.route("/createResults").patch(createPegionResults);

export default router;
