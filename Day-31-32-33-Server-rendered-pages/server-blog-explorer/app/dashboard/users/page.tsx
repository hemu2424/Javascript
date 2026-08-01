import UserCard from "@/components/UserCard";
import { getUsers } from "@/lib/api";

export default async function DashboardUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}