const { verify } = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.get("authorization");
  if (token) {
    verify(
      token.split("Bearer ")[1],
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          res.status(400).json({ success: 0, message: "Invalid token." });
        } else {
          req.user = decoded;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ success: 0, message: "No token." });
  }
}

module.exports = verifyToken;
