import problemModel from "../models/problem.model.js";
import { generateProblem } from "../api/problem.js";
import { createProblemSchema } from "../middleware/Validation.js";


export const saveProblem = async (req, res) => {
    try {
        const { title } = req.body;

        const existingProblem = await problemModel.findOne({
            title: title
        });

        if (existingProblem) {
            return res.status(400).json({
                message: "This problem already exists."
            });
        }

        const problemData = await generateProblem(title);

        if (createProblemSchema.validate(problemData).error) {
            return res.status(400).json({
                message: "Invalid problem data",
                error: createProblemSchema.validate(problemData).error.details
            });
        }
        const newProblem = await problemModel.create(problemData);

        res.status(201).json({
            message: "Problem created successfully",
            problem: newProblem
        });

    } catch (error) {
        console.error("Error creating problem:", error);
        res.status(500).json({
            message: "Error creating problem",
            error: error.message
        });
    }
}