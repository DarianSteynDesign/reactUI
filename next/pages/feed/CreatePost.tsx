"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { createPost } from "../../app/lib/userActions";

const CreatePost: React.FC = () => {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result as string);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    if (!user?.id) {
      console.error("User not logged in");
      return;
    }

    setLoading(true);
    try {
      await createPost({ text, image: image || "", userId: user.id });
      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user?.id) {
    return <div>Loading user information...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        className="w-full p-2 bg-gray-700 text-white rounded-md"
      />
      
      <input type="file" onChange={handleImageUpload} className="mt-3 text-white" />

      {image && <img src={image} alt="Preview" className="mt-3 max-w-xs rounded-lg" />}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePost;
