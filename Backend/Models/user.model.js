import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    height: {
      type: Number, // Height in cm
    },
    weight: {
      type: Number, // Weight in kg
    },
    fitnessGoals: {
      type: String,
      enum: ["Lose Weight", "Build Muscle", "Maintain Fitness", "Increase Endurance"],
    },
    dailyCaloricIntake: {
      type: Number, // Recommended daily calories
      default: 0,
    },
    subscriptionPlan: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free",
    },
    personalBest: {
      squat: { type: Number, default: 0 },
      pushups: { type: Number, default: 0 },
      lunges: { type: Number, default: 0 },
    },
    totalReps: {
      squat: { type: Number, default: 0 },
      pushups: { type: Number, default: 0 },
      lunges: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
