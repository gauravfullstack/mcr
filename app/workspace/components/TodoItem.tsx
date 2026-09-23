import style from '../components/todoinput.module.css'

export default function TodoItem() {
    return (
        <li style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #eee",
        }}>
            <span
                style={{
                    cursor: "pointer"
                }}> This is TodoItem </span>
            <div>
                <button>Edit</button>
                <button>Remove</button>
            </div>
        </li>
    )
}