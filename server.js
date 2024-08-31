import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import Clubsroute from "./routes/Clubsroute.js";
import Pigeonownerroute from "./routes/Pigeonownerroute.js";
import tournamentRoute from "./routes/tournamentRoute.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/auth", Clubsroute);
app.use("/api/v1", Pigeonownerroute);
app.use("/api/v1/tournaments", tournamentRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to app</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`.bgGreen.white);
});
