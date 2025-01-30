import { Response } from 'express';
import { connectPosts } from '../../repository/mongoConnection';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

export const createPost = async (req: Request, res: Response) => {
  const { text, image, userId } = req.body;

  try {    
    const collection = await connectPosts();
    
    const newPost = {
      userId,
      text,
      image, 
      createdAt: new Date(),
      likes: 0
    };

    const result = await collection.insertOne(newPost);
    
    if (!result.acknowledged) {
      return res.status(400).json({ message: "Failed to create post" });
    }

    res.status(201).json({ _id: result.insertedId, ...newPost });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};


export const incrementLike = async (req: Request, res: Response) => {
  const { postId } = req.body;

  try {
    const objectId = new ObjectId(postId);
    
    const collection = await connectPosts();
    
    const updatedPost = await collection.findOneAndUpdate(
      { _id: objectId },
      { $inc: { likes: 1 } },
      { returnDocument: 'after' }
    );
    
    console.log(updatedPost);
    if (!updatedPost || !updatedPost?.likes) {
      return res.status(404).json({ message: 'Post not found' });
    } else {
      res.status(200).json(updatedPost.likes);
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to increment like', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to increment like', error: String(error) });
    }
  }
};



