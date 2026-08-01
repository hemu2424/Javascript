import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "220px",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2>Dashboard</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/posts">Posts</Link>
          <Link href="/dashboard/users">Users</Link>
          <Link href="/dashboard/albums">Albums</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        {children}
      </main>
    </div>
  );
}