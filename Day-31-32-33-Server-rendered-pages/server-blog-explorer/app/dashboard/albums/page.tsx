import AlbumCard from "@/components/AlbumCard";
import { getAlbums } from "@/lib/api";

export default async function DashboardAlbumsPage() {
  const albums = await getAlbums();

  return (
    <div>
      <h1>Albums</h1>

      {albums.slice(0, 10).map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
        />
      ))}
    </div>
  );
}