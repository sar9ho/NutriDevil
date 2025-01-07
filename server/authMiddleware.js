const adminToken = process.env.ADMIN_TOKEN || 'default_token';

const authenticateAdmin = (req, res, next) => {
  console.log('Loaded ADMIN_TOKEN:', adminToken); // for testing
  console.log('Authorization Header:', req.headers.authorization); // for testing

  const token = req.headers.authorization;

  if (!token || token !== adminToken) {
    return res.status(403).json({ message: 'Access denied. Unauthorized.' });
  }

  next();
};

module.exports = authenticateAdmin;
