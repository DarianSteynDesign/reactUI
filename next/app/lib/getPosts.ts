import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
const client = new MongoClient(uri);

export async function getPosts() {
  try {
    await client.connect();
    const db = client.db('User');
    const posts = await db.collection('Posts').find({}).toArray();

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  } finally {
    await client.close();
  }
}
