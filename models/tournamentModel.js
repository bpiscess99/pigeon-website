import mongoose from "mongoose";


const tournamentSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "owner"
    },
    // clubName: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "users",
    // },
    clubName:{
        type: String,
        required: true,
    },
    // image:{
    // type: String,
    // },
    tournamentName: {
        type: String,
        required: true
    },
    tournamentInformation:{
        type: String,
    },
    category:{
        type: String
    },
    startDate: {
        type: Date,
        required: true
    }, 
    numberOfDays:{
        type: Number,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    numberOfPigeons:{
        type: Number,
        required: true,
    },
    noteTimeForPigeons: {
        type: Number,
    },
    helperPigeons: {
        type: Number
    },
    continueDays: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["active", "not active"],
        default: "active",
    },
    type: {
        type: String,
    },
    participatingLoft: { 
       type: String,
    },
    numberOfPrizes:{
        type: Number,
    },
    prize1:{
        type: Number,
    },
    prize2: {
        type: Number,
    },
    prize3: {
        type: Number
    }
},{
    timestamps: true
}
);

export default mongoose.model("Tournament", tournamentSchema);