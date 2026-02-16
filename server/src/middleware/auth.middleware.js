import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach identity to request
    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    console.error("Error while token verfication!", err);
    return res.status(401).json({ message: "Invalid token!" });
  }
};