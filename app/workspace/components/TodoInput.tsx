import style from '../components/todoinput.module.css'

export default function TodoInput() {
    return (
        <div className={style.container}>
            <input
                type="text"
                placeholder='Enter task...'
                className={style.todo_input}
            />
            <button
                className={style.button}
            >
                Add
            </button>
        </div>
    )
}