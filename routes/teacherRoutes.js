import express from "express";
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  rateTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

// Public
router.get("/", getTeachers);
router.get("/:id", getTeacherById);

// Admin
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

// Student Rating
router.post("/:id/rate", rateTeacher);

export default router;
