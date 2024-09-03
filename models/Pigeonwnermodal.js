import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: [true, "tournament is required"],
    },
    name: { type: String, required: true },
    contacts: { type: String, required: true },
    city: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String },
    pigeonsResults: {
      totalPigeons: {
        type: Number,
      },
      firstPigeonReturnTime: {
        type: String,
      },
      secondPigeonReturnTime: {
        type: String,
      },
      thirdPigeonReturnTime: {
        type: String,
      },
      fourthPigeonReturnTime: {
        type: String,
      },
      fifthPigeonReturnTime: {
        type: String,
      },
      sixthPigeonReturnTime: {
        type: String,
      },
      seventhPigeonReturnTime: {
        type: String,
      },
      total: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("owner", employeeSchema);
