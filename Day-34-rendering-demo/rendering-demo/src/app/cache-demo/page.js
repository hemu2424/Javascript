import Link from "next/link";

export default function CacheDemoHome() {
  return (
    <div>
      <h1>Next.js Fetch Cache Demo</h1>

      <ul>
        <li>
          <Link href="/cache-demo/force-cache">Force Cache Demo</Link>
        </li>

        <li>
          <Link href="/cache-demo/no-store">No Store Demo</Link>
        </li>

        <li>
          <Link href="/cache-demo/revalidate">Revalidate Demo</Link>
        </li>
      </ul>
    </div>
  );
}