export default async function MemoizationPage() {
  console.log("Memoization Page");

  console.time("fetch");

  const res1 = await fetch("https://dummyjson.com/products");
  const data1 = await res1.json();

  const res2 = await fetch("https://dummyjson.com/products");
  const data2 = await res2.json();

  const res3 = await fetch("https://dummyjson.com/products");
  const data3 = await res3.json();

  console.timeEnd("fetch");

  return (
    <div>
      <h1>Request Memoization Demo</h1>

      <p>Product 1: {data1.products[0].title}</p>

      <p>Product 2: {data2.products[1].title}</p>

      <p>Product 3: {data3.products[2].title}</p>
    </div>
  );
}