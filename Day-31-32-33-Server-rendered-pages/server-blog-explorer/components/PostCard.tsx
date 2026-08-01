import { Post } from "@/types/post";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({
  post,
}: PostCardProps) {
  return (
    <article
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <h2>{post.title}</h2>

      <p>{post.body}</p>

      <Link href={`/posts/${post.id}`}>
        View Details
      </Link>
    </article>
  );
}