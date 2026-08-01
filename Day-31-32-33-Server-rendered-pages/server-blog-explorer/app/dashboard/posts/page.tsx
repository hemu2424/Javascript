import { getPosts } from "@/lib/api";
import Link from "next/link";



export default async function DashboardPostsPage() {
 

  const posts = await getPosts()

  return (
    <div>
      <h1>Posts</h1>

      {posts.slice(0, 10).map((post) => (
        <article
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        >
          <h2>{post.title}</h2>

          <p>{post.body.substring(0, 100)}</p>
          <p>Author ID: {post.userId}</p>

          <Link href={`/posts/${post.id}`}>
            View Post
          </Link>
        </article>
      ))}
    </div>
  );
}