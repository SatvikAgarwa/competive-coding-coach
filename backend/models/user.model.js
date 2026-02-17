import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    totalAttempts: {
      type: Number,
      default: 0,
    },
    totalSolved: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    weakTopics: [
      {
        type: String,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Index for faster lookup
userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
