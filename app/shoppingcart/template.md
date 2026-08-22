## 🛒 Shopping Cart — Step 1: Clarifying Requirements

### Functional Requirements
- Display list of products
- Add product to cart
- Remove product from cart
- Increase / decrease quantity
- Show total price
- Show total items count in cart

### Smart Questions to ask interviewer
> "Before I start, I'd like to clarify a few things…"

- Should cart persist after refresh? → No, local state is fine
- Can same product be added multiple times? → Yes, increase quantity
- Any max quantity limit per product? → No
- Should we have a separate cart page or sidebar? → Sidebar/section on same page
- Do we fetch products from API or mock data? → Mock data

---

## Step 2: Data Model

```ts
// one product in the store
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
}

// one item in the cart
type CartItem = {
  product: Product;
  quantity: number;
}
```

**Why two separate types?**
> `Product` = what exists in store — never changes.
> `CartItem` = product + how many user wants. Quantity lives here, not in Product — because same product can have different quantities in different users' carts.

---

## Step 3: Component Design

```
src/
├── types/
│   └── index.ts
├── data/
│   └── products.ts        → mock product list
├── hooks/
│   └── useCart.ts         → all cart logic
├── components/
│   ├── ProductCard.tsx    → single product UI
│   ├── ProductList.tsx    → grid of products
│   ├── CartItem.tsx       → single cart item UI
│   └── Cart.tsx           → full cart UI
└── App.tsx
```

### Component Responsibilities

**App.tsx** → connects ProductList and Cart together

**ProductList.tsx** → renders all products in a grid, props driven

**ProductCard.tsx** → single product — name, price, image, Add to Cart button

**Cart.tsx** → renders all cart items, total price, total count

**CartItem.tsx** → single cart item — quantity controls, remove button

**useCart.ts** → all logic — add, remove, increase, decrease, total calculation

---

## Step 4: State Design

```ts
// inside useCart.ts
const [cartItems, setCartItems] = useState<CartItem[]>([]);
```

**Why only one state?**
> Everything is derived from `cartItems`:
```ts
// total items count — derived
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

// total price — derived
const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
```
> Never store what you can calculate. 🎯

---

## Step 5: Core Operations

```ts
// 1. Add to cart
const addToCart = (product: Product): void => {
  // if product already in cart → increase quantity
  // if not → add new CartItem with quantity 1
}

// 2. Remove from cart
const removeFromCart = (productId: number): void => {
  // filter out item with this productId
}

// 3. Increase quantity
const increaseQuantity = (productId: number): void => {
  // map → find item → quantity + 1
}

// 4. Decrease quantity
const decreaseQuantity = (productId: number): void => {
  // if quantity === 1 → remove from cart
  // else → quantity - 1
}
```

---

## Step 6: UI Behavior Plan

```
Left side → Product grid
  - Each product shows name, price, image
  - "Add to Cart" button
  - If already in cart → button says "Added ✓"

Right side → Cart
  - Each cart item shows name, quantity controls, price
  - + / - buttons for quantity
  - Remove button
  - Bottom → Total items + Total price
```

---

## Step 7: Edge Cases

| Edge Case | How we handle |
|---|---|
| Same product added twice | Increase quantity, don't add duplicate |
| Quantity decreased to 0 | Auto remove from cart |
| Empty cart | Show "Cart is empty" message |
| Price calculation | `price * quantity` per item, sum all |

---
