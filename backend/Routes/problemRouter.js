import { Router } from "express";
import { saveProblem } from "../controllers/problemController.js";

const problemRouter = Router();

problemRouter.post("/save", saveProblem);;

export default problemRouter;