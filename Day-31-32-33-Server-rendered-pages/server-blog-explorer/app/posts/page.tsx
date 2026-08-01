import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export default async function DashboardPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts</h1>

      {posts.slice(0, 10).map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}