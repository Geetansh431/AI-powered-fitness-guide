import jwt from "jsonwebtoken";

export const genrateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // cross site scrpting attack
    sameSite: "strict", 
    // Cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
