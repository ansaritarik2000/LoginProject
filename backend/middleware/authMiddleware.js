import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // 1. Token headers se lena (Authorization: Bearer <token>)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided." });
  }

  try {
    // 2. Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. User data ko request object me attach karna
    req.user = decoded;

    // 4. Next middleware/controller call karna
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token"})
  }
};
