export default function HomePage() {
  return (
    <div>
      <h1>Next.js Rendering Playground</h1>

      <p>
        This project demonstrates the difference between SSR, SSG, and ISR in
        Next.js.
      </p>

      <ul>
        <li>SSR → Server Side Rendering</li>
        <li>SSG → Static Site Generation</li>
        <li>ISR → Incremental Static Regeneration</li>
      </ul>

      <p>Select any page from the navigation bar.</p>
    </div>
  );
}