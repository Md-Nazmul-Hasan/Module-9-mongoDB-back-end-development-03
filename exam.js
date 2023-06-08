const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Secret key for JWT verification
const secretKey = 'we5438#$%654ygher095i$^%&fedrtgf';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    // If token is not present, return an error response
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);

    // If verification is successful, you can access the decoded payload
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If verification fails, return an error response
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected route that requires JWT token verification
app.get('/protected', verifyToken, (req, res) => {
  // Access the user data from the decoded token
  const user = req.user;

  // Add your own logic to handle the protected route
  res.json({ message: 'Access granted', user });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
