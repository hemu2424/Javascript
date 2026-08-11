"use client";

import { usePathname, useRouter } from "next/navigation";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push("/dashboard")}
        className="font-semibold"
      >
        AI Workspace
      </button>

      <p className="text-sm text-gray-500">
        {pathname}
      </p>
    </div>
  );
}