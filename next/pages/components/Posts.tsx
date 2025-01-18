'use client'

import React, { useState, useEffect } from 'react';
import { incrementLike } from '../../app/lib/userActions';

interface Post {
  _id: string;
  id: string;
  title: string;
  content: string;
  likes: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const updateLikes = (postId: string, newLikes: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: newLikes } : post
      )
    );
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Likes: {post.likes}</p>

          <LikeButton 
            postId={post._id} 
            initialLikes={post.likes} 
            onLikeUpdate={updateLikes}
          />
        </li>
      ))}
    </ul>
  );
};

const LikeButton: React.FC<{ postId: string, initialLikes: number, onLikeUpdate: (postId: string, newLikes: number) => void }> = ({ postId, initialLikes, onLikeUpdate }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  const handleLikeClick = async () => {
    setPending(true);
    try {
      const updatedLikes = await incrementLike(postId);
      setLikes(updatedLikes);
      onLikeUpdate(postId, updatedLikes);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick} disabled={pending}>
        {pending ? 'Liking...' : 'Like'}
      </button>
      <p>Total Likes: {likes}</p>
    </div>
  );
};



export default Posts;
