export default async function NoStorePage() {
  console.log("No Store Page Rendered");

  const response = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  const data = await response.json();

  return (
    <div>
      <h1>No Store Demo</h1>

      <p>
        <strong>Time:</strong> {new Date().toLocaleTimeString()}
      </p>

      <p>
        <strong>Random:</strong> {Math.floor(Math.random() * 10000)}
      </p>

      <p>
        <strong>First Product:</strong> {data.products[0].title}
      </p>
    </div>
  );
}