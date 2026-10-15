'use client';
import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import useCart from "./hooks/useCart";

export default function ShoppingCart() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const {
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalItems,
        totalPrice
    } = useCart();

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
                <h2 style={{ color: "#0e45b2" }}>Gaurav's Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(true)}>
                    Cart ({totalItems})
                </button>
            </div>

            <ProductList onAddToCart={addToCart} />

            {isCartOpen && (
                <div style={{ position: "fixed", top: 0, right: 0, width: "350px", maxWidth: "100%", height: "100vh", overflowY: "auto", background: "white", boxShadow: "0 0 10px #999", zIndex: 10 }}>
                    <button onClick={() => setIsCartOpen(false)} style={{ margin: "20px" }}>
                        Close
                    </button>
                    <Cart
                        cart={cart}
                        onRemove={removeFromCart}
                        onIncrease={increaseQty}
                        onDecrease={decreaseQty}
                        totalPrice={totalPrice}
                    />
                </div>
            )}
        </div>
    );
}