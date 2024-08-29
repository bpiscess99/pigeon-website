import express from "express";
import { createTournament, uploadImage } from "../controllers/tournamentController.js";
// import { requiresingnin } from "../middlewares/Authmiddleware.js";

const router = express.Router();


router.post("/createTournament", uploadImage, createTournament)

export default router;