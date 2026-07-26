import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const imageUrl = product.thumbnail || product.images?.[0] || product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80";
  const rating = typeof product.rating === "number" ? product.rating.toFixed(1) : "4.5";
  const stockLabel = product.stock > 0 ? `${product.stock} in stock` : "Out of stock";
  const discount = product.discountPercentage ? `${Math.round(product.discountPercentage)}% off` : "Best seller";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        <img src={imageUrl} alt={product.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {discount}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{product.brand || product.category}</p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">{product.title}</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.category}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
          <span>⭐ {rating}</span>
          <span>{stockLabel}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">${product.price}</p>
            <p className="text-xs text-slate-500">Free shipping</p>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add to Cart
          </button>
         
        </div>
      </div>
    </article>
  );
}

export default ProductDetails;