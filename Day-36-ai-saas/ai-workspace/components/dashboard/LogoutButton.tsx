import { logout } from "@/actions/auth/logout";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">
        Logout
      </button>
    </form>
  );
}