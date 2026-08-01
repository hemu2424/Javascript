import { Album } from "@/types/album";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({
  album,
}: AlbumCardProps) {
  return (
    <article
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <h2>{album.title}</h2>

      <p>
        <strong>Album ID:</strong> {album.id}
      </p>

      <p>
        <strong>User ID:</strong> {album.userId}
      </p>
    </article>
  );
}