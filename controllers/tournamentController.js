import Tournament from "../models/tournamentModel.js";
import PigeonOwner from "../models/Pigeonwnermodal.js"
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory for storing files
    },
    filename: (req, file, cb) => {
      const uniqueName = `${crypto.randomBytes(16).toString('hex')}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
  
  const upload = multer({ storage });

export const createTournament = async (req, res) => {
    
    try {
        
        const {clubName, 
            tournamentName, 
            startDate, 
            numberOfDays, 
            startTime, 
            numberOfPigeons, 
           
        } = req.body;
        
        console.log("Request Body:", req.body)
        // validation
        if(!clubName || !tournamentName || !startDate || !numberOfDays || !startTime || !numberOfPigeons){
            res.status(400).json({message: "please fill all required filed"})
        }
        
        const ownerId = req.user._id
        
        const tournament = await Tournament.create({
             owner: ownerId,
            clubName,
            image: req.file ? req.file.filename : null,
            tournamentName,
            tournamentInformation,
            category,
            startDate,
            numberOfDays,
            startTime,
            numberOfPigeons,
            noteTimeForPigeons,
            helperPigeons,
            continueDays,
            status: "active",
            type,
            participatingLoft,
            numberOfPrizes,
            prize1,
            prize2,
            prize3,
        })
        // console.log("tournament:", tournament)
        res.status(201).json({
            "Tournament created Successfully": tournament
        })    
    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
    
};

export const uploadImage = upload.single("image")
