'use client';
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import useCart from "./hooks/useCart";

export default function ShoppingCart() {
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
            <h2 style={{ textAlign: "center", color: "#0e45b2" }}>
                Gaurav's Cart ({totalItems})
            </h2>

            <ProductList onAddToCart={addToCart} />

            <Cart
                cart={cart}
                onRemove={removeFromCart}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                totalPrice={totalPrice}
            />
        </div>
    );
}