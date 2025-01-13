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

    // Check if the user exists
    const collection = await connectUsers();
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};
