import express from "express";
import {
  createTournament,
  deleteTournament,
  getAllTournaments,
  getTournament,
  updateTournament,
  getTournamentsOfClubs,
  uploadImage,
} from "../controllers/tournamentController.js";
// import { requiresingnin } from "../middlewares/Authmiddleware.js";

const router = express.Router();
router.route("/club/:club_id").get(getTournamentsOfClubs);

router.route("/").get(getAllTournaments);
router.route("/").post(uploadImage, createTournament);

router
  .route("/:tournamentId")
  .get(getTournament)
  .delete(deleteTournament)
  .patch(updateTournament);
export default router;
