import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String,
       required: true,
        minlength: 6
   },
    fullName: {
      type: String,
      required: true 
    },
    age: { type: Number },
    gender: {
      type: String, 
      enum: ["Male", "Female"] 
    },
    height: { type: Number },
    weight: { type: Number },
    fitnessGoals: {
      type: String,
      enum: ["Lose Weight", "Build Muscle", "Maintain Fitness", "Increase Endurance"],
    },
    dailyCaloricIntake: { type: Number, default: 0 },
    subscriptionPlan: { type: String, enum: ["Free", "Premium"], default: "Free" },
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutorial" }],
    
    totalPoints: { type: Number, default: 0 },


    challengesCompleted: [
      {
        challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
        score: Number, // Highest score for that challenge
      },
    ],

    personalBest: {
      Squat: { type: Number, default: 0 },
      Pushups: { type: Number, default: 0 },
      Lunges: { type: Number, default: 0 },
    },
    totalReps: {
      Squat: { type: Number, default: 0 },
      Pushups: { type: Number, default: 0 },
      Lunges: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
