import type { Product } from "../types/shopping";

type Props = {
    item: Product;
    onAddToCart: (product: Product) => void;
};

export default function ProductCard({ item, onAddToCart }: Props) {
    return (
        <div style={{ width: '31%', border: '1px solid #7b828f', borderRadius: '9px', padding: '10px' }}>
            <h4>{item.title}</h4>
            <p style={{ fontSize: '0.8rem' }}>{item.body}</p>
            <p>₹{item.price}</p>
            <button onClick={() => onAddToCart(item)}>Add to Cart</button>
        </div>
    );
}