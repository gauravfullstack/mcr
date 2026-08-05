import { Products } from "../api/mockData";
import type { Product } from "../types/shopping";
import ProductCard from "./ProductCard";

type Props = {
    onAddToCart: (product: Product) => void;
};

export default function ProductList({ onAddToCart }: Props) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
            {Products.map((item: Product) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}