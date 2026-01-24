import { Link } from "react-router-dom"
import {memo} from 'react'

function Hero () {
    return (
        <section className="bg-[url(src/assets/accessories.webp)] h-96 bg-center text-white p-8 md:p-12 flex items-end">
            <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to ShopEase
                </h1>
                <p className="text-xl mb-8 opacity-90">
                    Discover amazing products at unbeatable prices. Free shipping on orders over $50!
                </p>
                <Link to="/products" className="btn-primary bg-primary text-white hover:bg-blue-700 text-lg px-8 py-3">
                    Shop Now
                </Link>
            </div>
        </section>
    )
}

export default Hero