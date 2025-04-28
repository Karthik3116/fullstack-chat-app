import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "7d"
  });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProd,                   // only over HTTPS
    sameSite: isProd ? "None" : "Lax",// allow cross-origin in prod
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    path: "/",                        // make it available on all routes
  });

  return token;
};

export default genToken;
