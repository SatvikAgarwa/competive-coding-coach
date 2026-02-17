import { Router } from "express";
// 1. Import your controllers (The actions) 🎬
import { register, login } from "../controllers/authController.js";

// 2. Import your Joi Schemas (The rules) 📏
import { registerUserSchema, loginUserSchema } from "../middleware/AuthValidation.js";

const router = Router();

/* ------------------------------------------------------------------
   This function takes your Joi schema and turns it into middleware!
------------------------------------------------------------------ */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ 
        message: "Validation Error", 
        error: error.details[0].message 
    });
  }

  next();
};

/* -------------------------
   Routes
-------------------------- */

router.post("/register", validate(registerUserSchema), register);

router.post("/login", validate(loginUserSchema), login);

export default router;