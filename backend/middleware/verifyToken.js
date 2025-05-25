const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // use dotenv in production

module.exports = (req, res, next) => {
  const token = req.cookies.token;
 
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
