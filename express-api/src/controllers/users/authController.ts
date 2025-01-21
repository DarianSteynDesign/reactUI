import { Request, Response } from 'express';
import { connectUsers } from '../../repository/mongoConnection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password } = req.body;

        const collection = await connectUsers();
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await collection.insertOne({
            name,
            surname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User signed up successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user' });
    }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const collection = await connectUsers();
    const user = await collection.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    console.log(token);

    res.cookie('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 3600 * 1000
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const verifyToken = (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};