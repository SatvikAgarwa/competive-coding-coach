import hintModel from "../models/hint.model.js";
import generateHint from "../api/hint.js";
import problemModel from "../models/problem.model.js";

export const getNextHint = async (req, res) => {
    try {
        const { problemId } = req.body;

        const problem = await problemModel.findById(problemId);
        if (!problem) return res.status(404).json({ message: "Problem not found" });

        let hintRecord = await hintModel.findOne({ problemId });
        
        let levelToGenerate = "";
        if (!hintRecord || !hintRecord.low) {
            levelToGenerate = "low";
        } else if (!hintRecord.medium) {
            levelToGenerate = "medium";
        } else if (!hintRecord.aggressive) {
            levelToGenerate = "aggressive";
        } else {
            return res.status(200).json({ 
                message: "All hints already generated!", 
                hints: hintRecord 
            });
        }

        const newHintText = await generateHint(problem.title, levelToGenerate);

        hintRecord = await hintModel.findOneAndUpdate(
            { problemId },
            { 
                $set: { [levelToGenerate]: newHintText },
                generatedBy: "AI" 
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ 
            level: levelToGenerate, 
            hint: newHintText 
        });

    } catch (error) {
        res.status(500).json({ message: "Error getting hint", error: error.message });
    }
};