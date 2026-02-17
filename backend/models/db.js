import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbURI = process.env.MongoDB_URI;

if (!mongodbURI) {
    throw new Error("MongoDB_URI is not defined in environment variables");
}

export const connectDB = async () => {
    try {
        await mongoose.connect(mongodbURI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // stop the app
    }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});
