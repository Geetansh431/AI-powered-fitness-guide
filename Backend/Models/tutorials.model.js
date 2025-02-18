import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    calories: {
      type: String,
    },
    intensity: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    participants: {
      type: String,
    },
    videoId: {
      type: String,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    trainer: {
      name: {
        type: String,
      },
      specialty: {
        type: String,
      },
      experience: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;
