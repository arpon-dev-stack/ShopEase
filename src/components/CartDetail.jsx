import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from "react";
import {decrementQuantity, addToCart, removeFromCart} from '../features/cart/cartSlice'
import { useDispatch } from "react-redux";

function CartDetail({item}) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    
    return (
        <div key={item.id} className="border-b p-2 content-between grid mob:grid-cols-2 mob:grid-rows-1 gird-cols-1 gird-rows-2 gap-2">
            {/* Product Image */}
            <div className="flex justify-start gap-x-2">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded self-center"
                    loading='lazy'
                />
                <div className="">
                    <h3 className="font-semibold capitalize text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm capitalize">{item.category}</p>
                    <p className="text-primary font-bold">${item.price}</p>
                </div>
            </div>

            {/* Product Info */}

            <div className="flex justify-evenly gap-2">
                <div className="flex items-center rounded-lg">
                    <button
                        onClick={() => { setQuantity(prev => prev - 1); dispatch(decrementQuantity({ ...item, quantity })) }}
                        className="h-11 w-11 rounded-lg hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button
                        onClick={() => { setQuantity(prev => prev + 1); dispatch(addToCart({ ...item, quantity })) }}
                        className="h-11 w-11 rounded-lg hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
                <div className="text-right col-span-1 w-20 flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-800 mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                        onClick={() => { dispatch(removeFromCart(item)) }}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash2 className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartDetail