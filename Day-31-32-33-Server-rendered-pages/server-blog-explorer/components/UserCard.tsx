import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({
  user,
}: UserCardProps) {
  return (
    <a
  href={`https://${user.website}`}
  target="_blank"
  rel="noopener noreferrer"
>
    <article
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <h2>{user.name}</h2>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Phone:</strong> {user.phone}
      </p>

      <p>
        <strong>Website:</strong> {user.website}
      </p>

      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
    </article>
    </a>
  );
}