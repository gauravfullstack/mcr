'use client';
import { useEffect, useState } from "react";
import { Products } from "../api/mockData";
import type { Product } from "../types/shopping";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_LOAD = 6;

type Props = {
    onAddToCart: (product: Product) => void;
};

export default function ProductList({ onAddToCart }: Props) {
    const [page, setPage] = useState(1);
    const hasMore = page * PRODUCTS_PER_LOAD < Products.length;

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

            if (isNearBottom && hasMore) {
                setPage(page + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, hasMore]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
            {Products.slice(0, page * PRODUCTS_PER_LOAD).map((item: Product) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}