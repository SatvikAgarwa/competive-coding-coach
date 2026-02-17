import { Router } from "express";

// 1. Controllers
import { register, login, logout,getuserProfile } from "../controllers/authController.js";

// 2. Joi Schemas (The rules)
import { registerUserSchema, loginUserSchema } from "../middleware/AuthValidation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

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

router.post("/register", validate(registerUserSchema), register);

router.post("/login", validate(loginUserSchema), login);

router.post("/logout", logout);

router.get("/me", protect, getuserProfile);

export default router;