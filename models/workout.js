const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: "Enter exercise type"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter exercise name"
  },
  duration: Number,
  distance: Number,
  weight: Number,
  reps: Number,
  sets: Number
});

const workoutSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;