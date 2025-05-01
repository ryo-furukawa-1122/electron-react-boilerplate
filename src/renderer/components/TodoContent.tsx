import { Todo } from "../types/types";
import { MdDeleteOutline } from "react-icons/md";

interface ElectronWindow extends Window {
    db: {
        loadTodoList: () => Promise<Array<Todo> | null>;
        storeTodoList: (todoList: Array<Todo>) => Promise<void>;
    }
}
declare const window: ElectronWindow;

// Read the todo list from the database
export const loadTodoList = async (): Promise<Array<Todo> | null> => {
    const todoList = await window.db.loadTodoList();
    return todoList;
}

// Store the todo list in the database
export const storeTodoList = async (todoList: Array<Todo>): Promise<void> => {
    await window.db.storeTodoList(todoList);
}

const TodoContent = (props: { todo: Todo; onCheck: Function; onDelete: Function }) => {
    const { todo, onCheck, onDelete } = props;
    const onCheckHandler = () => {
        onCheck(todo);
    }
    const onDeleteHandler = () => {
        onDelete(todo);
    }
    return (
        <li className={todo.completed ? 'checked' : ''}>
            <label>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={onCheckHandler}
                ></input>
                <span>{todo.title}</span>
            </label>
            <button
                onClick={onDeleteHandler}
                className='delete-button'
                aria-label='delete task'
            >
                <MdDeleteOutline color="#ffffff" />
            </button>
        </li>
    );
};

export default TodoContent;