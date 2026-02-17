import Joi from "joi";
import mongoose from "mongoose";

/* -------------------------
   Helper: ObjectId Validator
-------------------------- */
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

/* -------------------------
   User Validation
-------------------------- */

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).max(100).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* -------------------------
   Problem Validation
-------------------------- */

export const createProblemSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),

  description: Joi.string().required(),

  difficulty: Joi.string()
    .valid("Easy", "Medium", "Hard")
    .required(),

  topics: Joi.array().items(Joi.string()).required(),

  constraints: Joi.object({
    nRange: Joi.string().required(),
    valueRange: Joi.string().required(),
  }).required(),

  createdBy: Joi.string()
    .valid("admin", "ai", "user")
    .optional(),
});

/* -------------------------
   Submission Validation
-------------------------- */

export const createSubmissionSchema = Joi.object({
  userId: Joi.string().custom(objectIdValidator).required(),

  problemId: Joi.string().custom(objectIdValidator).required(),

  code: Joi.string().min(10).required(),

  language: Joi.string().valid("C++").required(),
});

/* -------------------------
   Hint Validation
-------------------------- */

export const createHintSchema = Joi.object({
  problemId: Joi.string().custom(objectIdValidator).required(),

  low: Joi.string().required(),

  medium: Joi.string().required(),

  aggressive: Joi.string().required(),

  generatedBy: Joi.string()
    .valid("AI", "Cached")
    .optional(),
});
