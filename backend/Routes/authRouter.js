import { Router } from "express";

// 1. Controllers
import { register, login, logout,getuserProfile } from "../controllers/authController.js";

// 2. Joi Schemas (The rules)
import { registerUserSchema, loginUserSchema } from "../middleware/Validation.js";
import { protect } from "../middleware/auth.middleware.js";

const authrouter = Router();

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

authrouter.post("/register", validate(registerUserSchema), register);
authrouter.post("/login", validate(loginUserSchema), login);
authrouter.post("/logout", logout);
authrouter.get("/me", protect, getuserProfile);

export default authrouter;