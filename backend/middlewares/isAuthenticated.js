import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    req.userId = decoded.userId;
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
      error: error.message,
    });
  }
};
export const verifyStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
      next();
  } else {
      return res.status(403).json({ message: "Access restricted to students only." });
  }
};


export default isAuthenticated;
