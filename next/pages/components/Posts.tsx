"use client";

import React, { useState, useEffect } from "react";
import { incrementLike } from "../../app/lib/userActions";

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
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
    <ul className="space-y-6">
      {posts.map((post) => (
        <li
          key={post.id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.content}</p>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Likes:</span>{" "}
              {post.likes}
            </p>

            <LikeButton
              postId={post._id}
              initialLikes={post.likes}
              onLikeUpdate={updateLikes}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

const LikeButton: React.FC<{
  postId: string;
  initialLikes: number;
  onLikeUpdate: (postId: string, newLikes: number) => void;
}> = ({ postId, initialLikes, onLikeUpdate }) => {
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
    <div className="flex items-center space-x-4 mt-2">
      <button
        onClick={handleLikeClick}
        disabled={pending}
        className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        }`}
      >
        {pending ? "Liking..." : "Like"}
      </button>
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Total Likes:</span> {likes}
      </p>
    </div>
  );
};

export default Posts;
