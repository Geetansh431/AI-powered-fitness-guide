import bcrypt from "bcrypt";
import User from "../Models/user.model.js";
import { generateToken } from "../Lib/utils.js";
import jwt from "jsonwebtoken";
import { sendForgotMail, sendMail } from "../Middleware/sendMail.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No User with this email exists",
      });
    }
    // Checking password with hashed password
    const isCorrPass = await bcrypt.compare(password, user.password);

    if (!isCorrPass) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signupController = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Checking input and required constraints
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All input fields required" });
    }
    if (password < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    user = {
      fullName,
      email,
      password: hashedpassword,
    };
    const otp = Math.floor(Math.random() * 1000000);

    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "5m",
      }
    );

    const data = {
      fullName,
      otp,
    };

    await sendMail(email, "FitAI PRO", data);
    return res.status(200).json({
      success: true,
      message: "OTP sent to your Email..",
      activationToken,
    });
  } catch (error) {
    console.log("Error in signing up", error.message);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyUser = async (req, res) => {
  const { otp, activationToken } = req.body;

  console.log(activationToken);
  console.log(otp);
  const verify = jwt.verify(activationToken, process.env.JWT_TOKEN);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    fullName: verify.user.fullName,
    email: verify.user.email,
    password: verify.user.password,
    role: verify.user.role,
  });

  res.json({
    message: "User Registered",
  });
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "User Logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      age,
      gender,
      height,
      weight,
      fitnessGoals,
      dailyCaloricIntake,
      personalBest,
      totalReps,
    } = req.body;

    // Create an object to store fields that need to be updated
    const updates = {};

    // Only add fields that are actually provided in the request
    if (fullName) updates.fullName = fullName;
    if (age) updates.age = age;
    if (gender) updates.gender = gender;
    if (height) updates.height = height;
    if (weight) updates.weight = weight;
    if (fitnessGoals) updates.fitnessGoals = fitnessGoals;
    if (dailyCaloricIntake) updates.dailyCaloricIntake = dailyCaloricIntake;

    // Handle nested objects for personalBest
    if (personalBest) {
      // Check each nested field separately
      if (!updates.personalBest) updates.personalBest = {};
      if (personalBest.squat !== undefined)
        updates.personalBest.squat = personalBest.squat;
      if (personalBest.pushups !== undefined)
        updates.personalBest.pushups = personalBest.pushups;
      if (personalBest.lunges !== undefined)
        updates.personalBest.lunges = personalBest.lunges;
    }

    // Handle nested objects for totalReps
    if (totalReps) {
      // Check each nested field separately
      if (!updates.totalReps) updates.totalReps = {};
      if (totalReps.squat !== undefined)
        updates.totalReps.squat = totalReps.squat;
      if (totalReps.pushups !== undefined)
        updates.totalReps.pushups = totalReps.pushups;
      if (totalReps.lunges !== undefined)
        updates.totalReps.lunges = totalReps.lunges;
    }

    // If no updates were provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

    // Update user with provided fields
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Profile Update Error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller : ", error.message);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    // Get top 20 users based on Personal Best
    const topPersonalBest = await User.find()
      .sort({
        "personalBest.squat": -1,
        "personalBest.pushups": -1,
        "personalBest.lunges": -1,
      })
      .limit(20)
      .select("fullName personalBest"); // Selecting only required fields

    // Get top 20 users based on Total Reps
    const topTotalReps = await User.find()
      .sort({
        "totalReps.squat": -1,
        "totalReps.pushups": -1,
        "totalReps.lunges": -1,
      })
      .limit(20)
      .select("fullName totalReps");

    return res.status(200).json({
      success: true,
      leaderboard: {
        personalBest: topPersonalBest,
        totalReps: topTotalReps,
      },
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.. Please try again later",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No User found with this email" });
    }

    const expire = Date.now() + 5 * 60 * 1000;

    const token = jwt.sign({ email }, process.env.forgot_secret);
    const data = { email, token, expire };

    await sendForgotMail("FitAI PRO", data);

    res.json({
      message: "Reset Password Link is send to you mail",
      token,
    });
  } catch (error) {
    console.error("Error in forgot password : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const decoded = jwt.verify(req.query?.token, process.env.forgot_secret);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No User found with this email" });
    }

    if (decoded.expire === null || decoded.expire < Date.now()) {
      return res.status(400).json({ success: false, message: "Token expired" });
    }

    const password = await bcrypt.hash(req.body?.password, 10);

    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in reset password ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.. Please try again later",
    });
  }
};
