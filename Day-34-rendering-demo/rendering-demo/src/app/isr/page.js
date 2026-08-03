export const revalidate = 20;

export default async function ISRPage() {
  console.log("ISR Page Generated");

  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  const generatedTime = new Date().toLocaleTimeString();

  const randomNumber = Math.floor(Math.random() * 10000);

  return (
    <div>
      <h1>ISR Demo</h1>

      <p>
        <strong>Generated Time:</strong> {generatedTime}
      </p>

      <p>
        <strong>Random Number:</strong> {randomNumber}
      </p>

      <p>
        <strong>Revalidate Every:</strong> 20 seconds
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