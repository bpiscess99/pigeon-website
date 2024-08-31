import mongoose from "mongoose";

const tournamentSchema = mongoose.Schema(
  {
    club_owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "club owner is required"],
      ref: "users",
    },

    image: {
      type: String,
    },
    tournamentName: {
      type: String,
      required: true,
    },
    tournamentInformation: {
      type: String,
    },
    category: {
      type: String,
    },
    startDate: {
      type: Date,
      required: [true, "startdate is required"],
    },
    numberOfDays: {
      type: Number,
      // required: [true, "numberOfDays is required"],
    },
    startTime: {
      type: String,
      // required: [true, "startTime is required"],
    },
    numberOfPigeons: {
      type: Number,
      // required: [true, "numberOfPigeons ia required"],
    },
    noteTimeForPigeons: {
      type: String,
    },
    helperPigeons: {
      type: Number,
    },
    continueDays: {
      type: Number,
    },
    status_: {
      type: String,
      enum: ["active", "in active"],
      default: "active",
    },
    type: {
      type: String,
    },
    participatingLoft: {
      type: [String],
    },
    numberOfPrizes: {
      type: Number,
    },
    prize1: {
      type: Number,
    },
    prize2: {
      type: Number,
    },
    prize3: {
      type: Number,
    },
    prize4: {
      type: Number,
    },
    prize5: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tournament", tournamentSchema);
