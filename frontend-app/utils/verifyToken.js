// Middleware to verify token cookie
// const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.cookies.access_token; // Extract JWT from cookie
  if (!token) {
    return res.status(401).redirect("/login");
  }
  try {
    // const verified = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = verified; // Attach user data to the request object
    next(); // Proceed to the next middleware/route
  } catch (err) {
    return res.status(403).redirect("/login");
  }
};

module.exports = { verifyAuth };