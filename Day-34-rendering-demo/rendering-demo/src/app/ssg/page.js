export default async function SSGPage() {
  console.log("SSG Page Generated");

  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  const buildTime = new Date().toLocaleTimeString();

  const randomNumber = Math.floor(Math.random() * 10000);

  return (
    <div>
      <h1>SSG Demo</h1>

      <p>
        <strong>Build Time:</strong> {buildTime}
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