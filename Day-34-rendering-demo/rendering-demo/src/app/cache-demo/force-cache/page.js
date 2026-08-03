export default async function ForceCachePage() {
  console.log("Force Cache Page");

  const response = await fetch("https://dummyjson.com/products", {
    cache: "force-cache",
  });

  const data = await response.json();

  return (
    <div>
      <h1>Force Cache Demo</h1>

      <p>
        <strong>Time:</strong>{" "}
        {new Date().toLocaleTimeString()}
      </p>

      <p>
        <strong>Random:</strong>{" "}
        {Math.floor(Math.random() * 10000)}
      </p>

      <p>
        <strong>First Product:</strong>{" "}
        {data.products[0].title}
      </p>
    </div>
  );
}