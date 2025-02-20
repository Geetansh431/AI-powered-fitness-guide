import User from "../Models/user.model.js"
import jwt from "jsonwebtoken"

export const protectRoute = async (req, res, next) => {
  try {
    // Check if the JWT cookie exists
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token
    let decoded;
    try {
      decoded =  jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Check if the user exists in the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Attach the user object to the request
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    console.error("Error in Protected Route:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
