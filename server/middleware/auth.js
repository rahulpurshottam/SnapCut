import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Decode without verifying — just extract user ID from Clerk token
    const tokenData = jwt.decode(token);

    if (!tokenData || typeof tokenData !== 'object' || !tokenData.sub) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    // Attach Clerk user ID to request object
    req.clerkId = tokenData.sub;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export default authUser;
