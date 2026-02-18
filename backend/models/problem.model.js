import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    topics: [
      {
        type: String,
      },
    ],
    constraints: {
      nRange: String,
      valueRange: String,
    },
    createdBy: {
      type: String,
      enum: ["admin", "ai", "user"],
      default: "admin",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Problem", problemSchema);
