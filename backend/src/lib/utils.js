import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevent client-side JS access
    sameSite: "None", // Allow cross-origin cookies
    secure: process.env.NODE_ENV === "production", // Only true in production (HTTPS)
  });

  return token;
};

export default genToken;
