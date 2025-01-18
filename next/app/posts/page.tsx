
import { Suspense } from 'react';
import MorePosts from '../ui/MorePosts';
import { getPosts } from '../lib/getPosts';

export default function Page() {
  const posts = getPosts();

  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MorePosts posts={posts} />
      </Suspense>
    </div>
  );
}
