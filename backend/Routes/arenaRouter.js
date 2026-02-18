import { Router } from "express";
import { getNextHint } from "../controllers/hintController.js";

const arenaRouter = Router();

arenaRouter.post("/generate-hint", getNextHint);

export default arenaRouter;