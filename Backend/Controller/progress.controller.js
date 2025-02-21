import Challenge from "../Models/challenge.model.js";
import User from "../Models/user.model.js";

export const updateProgress = async (req, res) => {
  try {
    const userId = req.user?._id;
    const challengeId = req.params?.id;
    const { reps } = req.body;

    if (!reps) {
      return res.status(400).json({ success: false, message: "Please update your progress" });
    }

    const challenge = await Challenge.findById(challengeId);
    const user = await User.findById(userId);

    if (!user || !challenge) {
      return res.status(404).json({ success: false, message: "User or Challenge does not exist" });
    }

    let idx = -1;
    if(challenge.name === 'squat')  idx = 0;
    else if(challenge.name === 'pushup') idx = 1;
    else  idx = 2;

    if (reps >= challenge.target) {
      
      const existingRecord = user.challengesCompleted.find(
        (record) => record.challenge.toString() === challengeId
      );

      if (!existingRecord) {
        user.challengesCompleted.push({
          challenge: challengeId,
          score: challenge.points,
        });
      }

      // Update leaderboard
      challenge.completedBy.push({
        user: userId,
        score: challenge.points,
        reps : reps,
        completedAt: Date.now(),
      });
      user.personalBest[idx] = Math.max(user.personalBest[idx] , reps);
      user.totalReps[idx] = user.totalReps[idx] + reps;
      // Update user's total points
      user.totalPoints += challenge.points;

      // Save changes
      await user.save();
      await challenge.save();

      return res.status(200).json({ success: true, message: "Progress updated successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Challenge target not met" });
    }

  } catch (error) {
    console.error("Error in updating the progress", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const importChallenges = async (req, res) => {
  try {
    const challenges = req.body;

    if (!challenges || challenges.length === 0) {
      return res.status(400).json({ success: false, message: "No challenge data provided" });
    }

    // Insert multiple challenges
    await Challenge.insertMany(challenges);

    return res.status(201).json({
      success: true,
      message: `${challenges.length} challenges added successfully`,
    });
  } catch (error) {
    console.error("Error importing challenges:", error);
    return res.status(500).json({ success: false, message: "Failed to import challenges" });
  }
};

export const getAllChallenges = async(req,res) =>{
  const challenges = await Challenge.find();
  return res.status(200).json({success : true, message : "challenges fetched succesfully", challenges})
}