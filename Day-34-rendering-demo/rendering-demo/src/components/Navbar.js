import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "#222",
      }}
    >
      <Link href="/" style={{ color: "white" }}>
        Home
      </Link>

      <a href="/ssr" style={{ color: "white" }}>
        SSR
      </a>

      <Link href="/ssg" style={{ color: "white" }}>
        SSG
      </Link>

      <Link href="/isr" style={{ color: "white" }}>
        ISR
      </Link>
      <Link href="/cache-demo" style={{ color: "white" }}>
        cache-demo
      </Link>
    </nav>
  );
}