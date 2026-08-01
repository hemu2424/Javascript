import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
    </nav>
  );
}