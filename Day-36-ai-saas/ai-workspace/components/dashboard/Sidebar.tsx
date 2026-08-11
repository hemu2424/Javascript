import Link from "next/link";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Chat", href: "/chat" },
  { name: "AI Tools", href: "/tools" },
  { name: "Prompts", href: "/prompts" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <h1 className="mb-8 text-xl font-bold">
        AI Workspace
      </h1>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-md p-2 hover:bg-gray-100"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}