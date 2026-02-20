import { Router } from "express";
import { getNextHint } from "../controllers/hintController.js";
import { submitCode } from "../controllers/submissionsController.js";

const arenaRouter = Router();

arenaRouter.post("/generate-hint", getNextHint);
arenaRouter.post("/submit-code", submitCode);

export default arenaRouter;