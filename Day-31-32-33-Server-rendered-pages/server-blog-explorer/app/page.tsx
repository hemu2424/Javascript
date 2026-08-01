import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "30px" }}>
      <h1>Blog Explorer</h1>

      <p>
        This project is built to practice Server Components and Server Rendering
        in Next.js.
      </p>

      <Link href="/posts">Explore Posts →</Link>
    </main>
  );
}