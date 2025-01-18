import { Response } from 'express';
import { connectPosts } from '../../repository/mongoConnection';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

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



