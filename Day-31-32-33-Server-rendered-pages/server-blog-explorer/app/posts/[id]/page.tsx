import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    return {
      title: "Post Not Found",
    };
  }

  const post: Post = await response.json();

  return {
    title: post.title,
    description: post.body,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    notFound();
  }

  const post: Post = await response.json();

  return (
    <main style={{ padding: "30px" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}