import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import style from './parent.module.css'

export default function Workspace() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}


