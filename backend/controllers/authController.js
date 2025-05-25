const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const JWT_SECRET = 'your_jwt_secret'; // use dotenv in production

exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  console.log('Registering user:', { name, email, isAdmin });
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Query result:', rows);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, isAdmin ? 1 : 0] // storing isAdmin as 1 (true) or 0 (false)
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.is_admin },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000 * 24 , // 24 hour
      })
      
      .json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name, isAdmin: user.is_admin } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};
