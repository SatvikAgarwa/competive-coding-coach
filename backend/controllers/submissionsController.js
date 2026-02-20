import { runCode } from '../services/runUserCode.js';

export const submitCode = async (req, res) => {
    const { code, input } = req.body;

    try {
        const result = await runCode(code, input);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}