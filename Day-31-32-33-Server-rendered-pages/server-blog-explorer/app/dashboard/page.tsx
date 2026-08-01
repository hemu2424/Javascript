import { getAlbums, getPosts, getUsers } from "@/lib/api";

export default async function DashboardPage() {
  const [posts, users, albums] = await Promise.all([
    getPosts(),
    getUsers(),
    getAlbums(),
  ]);

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Posts</h2>
          <p>{posts.length}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Users</h2>
          <p>{users.length}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Albums</h2>
          <p>{albums.length}</p>
        </div>
      </div>
    </div>
  );
}