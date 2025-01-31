import { Request, Response } from 'express';
import { connectUsers } from '../../repository/mongoConnection';
import { Collection, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const collection: Collection = await connectUsers();
    const users = await collection.find({}).toArray();
    console.log('Fetching users from database...', users);
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const collection: Collection = await connectUsers();
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

export const userGetCart = async (req: any, res: Response) => {
  const userId = req.user.userId;
  
  try {
    const collection = await connectUsers();
    const cart = await collection.findOne({ _id: new ObjectId(userId) });
    console.log('Data get - ', cart, userId);
    res.status(200).json(cart?.cart || []);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to retrieve cart', error: error.message });
  }
};

export const getUserByToken = async (req: any, res: Response) => {
  const token = req.cookies["auth-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    const secret = process.env.JWT_SECRET || "my-secret-key";
    const decoded = jwt.verify(token, secret) as { userId: string; email: string };
    console.log(decoded);
    return res.json({ id: decoded.userId, email: decoded.email });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

export const userAddToCart = async (req: any, res: Response) => {
  const { cart } = req.body;
  const userId = req.user.userId;

  try {
    const collection = await connectUsers();
    await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { cart } }, { upsert: true });
    console.log('Data post - ', cart, req, userId);
    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to save cart', error: error.message });
  }
};