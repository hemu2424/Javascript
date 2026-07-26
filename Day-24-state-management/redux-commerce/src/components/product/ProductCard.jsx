function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.category}</p>

      <button>Add To Cart</button>
    </div>
  );
}

export default ProductCard;