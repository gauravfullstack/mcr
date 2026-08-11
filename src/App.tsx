import { Routes, Route } from "react-router-dom";
import InfinteScrolling from "./components/InfinteScrolling/InfiniteScrolling";
import TodoApp from "./components/Todos/TodoApp";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import PostSearch from "./components/Debouncing/components/PostSearch";
import CheckoutForm from "./components/CheckoutForm/Checkoutform";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import Dummy from "./components/Dummy/Dummy";
import StylingComponent from "./components/Styling/StylingComponent";
import ButtonShowcase from "./components/ButtonReusable/ButtonShowcase";
import CompleteForm from "./components/Form/CompleteForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dummy />} />
      <Route path="/mytodos" element={<TodoApp />} />
      <Route path="/buttonshowcase" element={<ButtonShowcase />} />
      <Route path="/checkoutform" element={<CheckoutForm />} />
      <Route path="/infinitescrolling" element={<InfinteScrolling />} />
      <Route path="/form" element={<CompleteForm />} />
      <Route path="/shoppingcart" element={<ShoppingCart />} />
      <Route path="/debouncing" element={<PostSearch />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/styling" element={<StylingComponent />} />
    </Routes>
  );
}
