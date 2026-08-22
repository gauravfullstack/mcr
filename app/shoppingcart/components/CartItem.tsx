import type { CartItems } from "../types/shopping";

type Props = {
    item: CartItems;
    onRemove: (id: number) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
};

export default function CartItem({
    item,
    onRemove,
    onIncrease,
    onDecrease
}: Props) {
    const { product, quantity } = item;

    return (
        <div style={{ marginBottom: "12px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h4>{product.title}</h4>
            <p>₹{product.price}</p>

            <div>
                <button onClick={() => onDecrease(product.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{quantity}</span>
                <button onClick={() => onIncrease(product.id)}>+</button>
            </div>

            <button onClick={() => onRemove(product.id)}>
                Remove
            </button>
        </div>
    );
}