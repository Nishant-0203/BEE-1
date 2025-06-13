import jwt from "jsonwebtoken";

export const authErrorHandler = (err, req, res, next) => {
  if (err.message === "No token provided") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Authentication required",
      error: "No authentication token provided"
    });
  }

  if (err.message === "Invalid token") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Invalid authentication",
      error: "Authentication token is invalid or expired"
    });
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Authentication error occurred",
    error: err.error || "Unknown authentication error"
  });
};
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    const error = new Error("No token provided");
    error.authError = true;
    error.statusCode = 401;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid token");
      error.authError = true;
      error.statusCode = 403;
      error.error = err.message;
      return next(error);
    }

    req.user = user;
    next();
  });
};