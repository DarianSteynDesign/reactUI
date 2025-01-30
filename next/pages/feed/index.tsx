import { useState, useEffect } from "react";
import { Suspense } from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useUser } from "../../context/UserContext";

export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();

    return {
      props: { posts },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { props: { posts: [] } };
  }
};

const FeedPage = ({ posts }: { posts: Post[] }) => {
  const { user } = useUser();
  const [showMyFeed, setShowMyFeed] = useState(false); // State to toggle between feeds
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts); // Store filtered posts here

  // Filter posts based on userId
  const filterPosts = (posts: Post[]) => {
    console.log("Filtering posts based on user id:", user?.id); // Debug
    return posts.filter((post) => post.userId === user?.id);
  };

  // Button click handlers
  const handleFeedClick = () => {
    setShowMyFeed(false); // Set to false to show all posts
  };

  const handleMyFeedClick = () => {
    setShowMyFeed(true); // Set to true to show only the filtered posts
  };

  useEffect(() => {
    if (user?.id) {
      // Re-filter posts whenever the user id changes
      const newFilteredPosts = filterPosts(posts);
      setFilteredPosts(newFilteredPosts);
    }
  }, [user, posts]); // Re-run the effect if `user` or `posts` change

  console.log("Posts:", posts); // Debug
  console.log("Filtered Posts:", filteredPosts); // Debug

  return (
    <div className="flex flex-col">
      <div className="flex m-auto">
        <button
          onClick={handleFeedClick}
          className="bg-white text-blue-700 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
        >
          Feed
        </button>
        <button
          onClick={handleMyFeedClick}
          className="bg-white text-blue-700 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
        >
          My Feed
        </button>
      </div>

      <CreatePost />
      <Suspense fallback={<div>Loading...</div>}>
        <Posts posts={showMyFeed ? filteredPosts : posts} />
      </Suspense>
    </div>
  );
};

export default FeedPage;
