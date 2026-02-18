import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["C++"],
      default: "C++",
    },
    result: {
      type: String,
      enum: ["Accepted", "TLE", "WA", "RE"],
    },
    detectedApproach: {
      type: String,
    },
    timeComplexity: {
      type: String,
    },
    mayFailReason: {
      type: String,
    },
    suggestedOptimal: {
      type: String,
    },
    timeTaken: {
      type: Number, // seconds
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);