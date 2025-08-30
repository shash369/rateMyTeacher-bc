import Teacher from "../models/Teacher.model.js";

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single teacher by ID
// @route   GET /api/teachers/:id
// @access  Public
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new teacher
// @route   POST /api/teachers
// @access  Admin
export const createTeacher = async (req, res) => {
  try {
    const { name, subject, image } = req.body;
    const teacher = new Teacher({ name, subject, image, ratings: [] });
    const createdTeacher = await teacher.save();
    res.status(201).json(createdTeacher);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a teacher
// @route   PUT /api/teachers/:id
// @access  Admin
export const updateTeacher = async (req, res) => {
  try {
    const { name, subject, image } = req.body;
    const teacher = await Teacher.findById(req.params.id);

    if (teacher) {
      teacher.name = name || teacher.name;
      teacher.subject = subject || teacher.subject;
      teacher.image = image || teacher.image;

      const updatedTeacher = await teacher.save();
      res.json(updatedTeacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a teacher
// @route   DELETE /api/teachers/:id
// @access  Admin
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      await teacher.deleteOne();
      res.json({ message: "Teacher removed" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Rate a teacher
// @route   POST /api/teachers/:id/rate
// @access  Student
export const rateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 10) {
      return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }

    // ✅ Push an object matching the schema
    teacher.ratings.push({ score: rating });

    const updatedTeacher = await teacher.save();

    res.json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
