import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { selectCartItems, selectTotalPrice, selectTotalQuantity } from "../features/cart/cartSelectors";
import { useNavigate } from "react-router-dom";

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const totalItems = useSelector(selectTotalQuantity);
    function handlehome() {
            navigate("/")

    }

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Cart</p>
                    <h2 className="text-xl font-semibold text-slate-900">Your bag</h2>
                </div>
                 <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    {totalItems} items
                </span>
                <button
                    onClick={handlehome}
                    className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                >
                   back to  home page
                </button>
               
            </div>

            {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <p className="text-sm font-semibold text-slate-800">Your cart is empty</p>
                    <p className="mt-2 text-sm text-slate-500">Add products to see them here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                                <img src={item.thumbnail || item.images?.[0] || item.image} alt={item.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-800">{item.title}</p>
                                <p className="mt-1 text-xs text-slate-500">Qty {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900">${item.price * item.quantity}</p>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>

            </div>
        </div>
    );
}

export default Cart;