import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 1, max:10},
  date: { type: Date, default: Date.now },
});

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    image: { type: String },
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },   // 👈 this enables virtuals in JSON
    toObject: { virtuals: true }, // 👈 same for objects
  }
);

// Virtual field for average rating
teacherSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, r) => acc + r.score, 0);
  return (sum / this.ratings.length).toFixed(2);
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
