import type { CartItems } from "../types/shopping";
import CartItem from "./CartItem";

type Props = {
    cart: CartItems[];
    onRemove: (id: number) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    totalPrice: number;
};

export default function Cart({
    cart,
    onRemove,
    onIncrease,
    onDecrease,
    totalPrice
}: Props) {
    return (
        <div style={{ padding: "20px" }}>
            <h3>Cart</h3>

            {cart.length === 0 && <p>No items in cart</p>}

            {cart.map(item => (
                <CartItem
                    key={item.product.id}
                    item={item}
                    onRemove={onRemove}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            ))}

            {cart.length > 0 && (
                <h3>Total: ₹{totalPrice}</h3>
            )}
        </div>
    );
}