export const dynamic = "force-dynamic";

export default async function SSRPage() {
  console.log("SSR Page Rendered");

  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  const currentTime = new Date().toLocaleTimeString();

  const randomNumber = Math.floor(Math.random() * 10000);

  return (
    <div>
      <h1>SSR Demo</h1>

      <p>
        <strong>Current Time:</strong> {currentTime}
      </p>

      <p>
        <strong>Random Number:</strong> {randomNumber}
      </p>

      <h2>Products</h2>

      <ul>
        {data.products.slice(0, 5).map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}