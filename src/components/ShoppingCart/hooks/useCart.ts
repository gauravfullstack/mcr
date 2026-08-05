import { useState } from "react";
import type { Product, CartItems } from "../types/shopping";

export default function useCart() {
    const [cart, setCart] = useState<CartItems[]>([]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.product.id !== id));
    };

    const increaseQty = (id: number) => {
        setCart(prev =>
            prev.map(item =>
                item.product.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id: number) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.product.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
    );

    return {
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalItems,
        totalPrice
    };
}