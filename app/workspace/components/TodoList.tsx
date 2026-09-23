import style from '../components/todoinput.module.css'
import TodoItem from './TodoItem'

export default function TodoList() {
    return (
        <ul className={style.list}>
            <TodoItem />
        </ul>
    )
}