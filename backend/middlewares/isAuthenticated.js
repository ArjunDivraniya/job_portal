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

    // Decode the token and extract userId
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    
    if(!decoded){
      
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }
    req.userId = decoded.userId;  // Change 'req.id' to 'req.userId'
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;

