import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectUsers } from "./repository/mongoConnection";
import { getUsers, userAddToCart, userGetCart } from './controllers/users/userController';
import { login, signup } from './controllers/users/authController';
import { incrementLike } from "./controllers/users/postController";

//Server init
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server running...');
});

// Middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());

//Route & Api Auth Token Check ------>
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'my-secret-key') as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

//Routes ------>

//POST
app.post('/api/signup', signup);

app.post('/api/login', login);

//GET
app.get('/api/protected', authenticateToken, (req: any, res: Response) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.get('/api/users', getUsers);

app.get('/api/cart', authenticateToken, userGetCart);

//PUT

app.put('/api/cart', authenticateToken, userAddToCart);

//PATCH

app.patch('/api/like', incrementLike);

// Start the server ------>
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
