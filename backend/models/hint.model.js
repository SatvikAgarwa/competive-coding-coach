import mongoose from "mongoose";

const hintSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    low: {
      type: String,
    },
    medium: {
      type: String,
    },
    aggressive: {
      type: String,
    },
    generatedBy: {
      type: String,
      enum: ["AI", "Cached"],
      default: "AI",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Hint", hintSchema);
