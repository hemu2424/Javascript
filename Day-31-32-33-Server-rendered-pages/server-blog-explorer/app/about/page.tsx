export default function AboutPage() {
  return (
    <main style={{ padding: "30px" }}>
      <h1>About</h1>

      <p>
        Blog Explorer is a practice project built with Next.js to learn the App
        Router, Server Components, and Server Rendering.
      </p>

      <p>
        In this project, data is fetched on the server before the page is sent
        to the browser, helping us understand how modern Next.js applications
        work.
      </p>
    </main>
  );
}