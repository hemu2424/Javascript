import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearProducts, fetchProduct } from '../features/products/productSlice';
import ProductDetails from './ProductDetails';
import { selectError, selectLoading, selectVisibleProducts } from '../features/products/productSelectors';
import SearchBar from '../components/product/SearchBar';
import { CategoryFilter } from '../components/product/CategoryFilter';
import Cart from './Cart';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const items = useSelector(selectVisibleProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch])

    function handleClear() {
        dispatch(clearProducts());
    }
    function handleCart(){
        navigate("/cart")
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-8 w-48 rounded bg-slate-200" />
                        <div className="mt-4 h-4 w-72 rounded bg-slate-100" />
                    </div>
                    <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
                                    <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
                                    <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
                                    <div className="mt-4 h-10 rounded-xl bg-slate-200" />
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">!</div>
                    <h2 className="mt-4 text-xl font-semibold text-slate-900">We hit a snag</h2>
                    <p className="mt-2 text-sm text-slate-500">{error}</p>
                    <button
                        onClick={() => dispatch(fetchProduct())}
                        className="mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                <header className="sticky top-0 z-20 mb-6 rounded-3xl border border-slate-200 bg-white/90 px-4 py-4 shadow-lg backdrop-blur sm:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Redux Commerce</p>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Shop the latest essentials</h1>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="w-full sm:min-w-[220px] lg:w-64">
                                <SearchBar />
                            </div>
                            <div className="w-full sm:min-w-[180px] lg:w-44">
                                <CategoryFilter />
                            </div>
                            <button
                                onClick={handleClear}
                                className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Clear Products
                            </button>
                             <button
                                onClick={handleCart}
                                className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Cart
                            </button>
                        </div>
                    </div>
                </header>

                <section className="mb-6 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">New season picks</p>
                            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Upgrade your everyday essentials</h2>
                            <p className="mt-3 max-w-xl text-sm text-blue-50 sm:text-base">Discover modern favorites curated for comfort, style, and performance.</p>
                        </div>
                        <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                            <p className="text-sm font-medium text-blue-50">Fast delivery</p>
                            <p className="text-2xl font-semibold">24/7 support</p>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Trending right now</h3>
                                <p className="text-sm text-slate-500">Curated picks from your filtered selection.</p>
                            </div>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                                {items.length} items
                            </span>
                        </div>

                        {items.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                                <h4 className="text-lg font-semibold text-slate-900">No products found</h4>
                                <p className="mt-2 text-sm text-slate-500">Try another search or category to uncover more products.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                                {items.map((product) => (
                                    <ProductDetails key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </section>

                   
                </div>
            </div>
        </div>
    );
}

export default Home
