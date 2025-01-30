"use client";

import React, { useState, useEffect } from "react";
import { incrementLike } from "../../app/lib/userActions";

const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [updatedPosts, setUpdatedPosts] = useState(posts);

  useEffect(() => {
    setUpdatedPosts(posts);
  }, [posts]);

  const updateLikes = async (postId: string) => {
    setUpdatedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );

    try {
      const updatedLikes = await incrementLike(postId);
      setUpdatedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: updatedLikes } : post
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ul className="space-y-6">
        {updatedPosts.map((post) => (
          <li
            key={post._id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-700"
          >
            {post.image !== "" && (
              <img
                src={post.image}
                alt="Post"
                className="mb-4 max-w-full h-60 object-cover rounded-lg"
              />
            )}

            <h3 className="text-lg font-semibold mb-2">{post.text}</h3>
            <p className="text-gray-300 mb-3">{post.createdAt}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                <span className="font-medium">Likes:</span> {post.likes}
              </p>
              <LikeButton postId={post._id} onLike={updateLikes} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LikeButton: React.FC<{
  postId: string;
  onLike: (postId: string) => void;
}> = ({ postId, onLike }) => {
  const [pending, setPending] = useState(false);

  const handleLikeClick = async () => {
    setPending(true);
    try {
      await onLike(postId);
    } finally {
      setPending(false);
    }
  };

  return (
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
  );
};

export default Posts;
