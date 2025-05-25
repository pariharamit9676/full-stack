// middleware/admin.js
module.exports = (req, res, next) => {
    console.log('Admin middleware triggered', req.user);
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
};
