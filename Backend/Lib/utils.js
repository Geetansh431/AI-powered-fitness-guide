import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
