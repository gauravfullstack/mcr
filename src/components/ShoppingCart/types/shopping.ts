export type Product = {
    id: number,
    title: string,
    body: string,
    price: number
}

export type CartItems = {
    product: Product,
    quantity: number
}