import style from './parent.module.css'

export default function Workspace() {
  return (
    <div className={style.container}>
      <div className={style.todo_container}>
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            placeholder='Enter your todo here...'
            className={style.todo_input}
          />
          <button>Add</button>
        </div>

      </div>
    </div>
  );
}


