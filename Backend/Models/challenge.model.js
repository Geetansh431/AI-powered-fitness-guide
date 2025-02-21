import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required :true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    muscleGroup: {
      type: String,
      required: true,
    },
    completedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        score: Number, // Score in the challenge
        reps : Number,
        completedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
