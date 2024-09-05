import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Image", imageSchema);
