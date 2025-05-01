import { Todo } from "../types/types";

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

const TodoContent = (props: { todo: Todo; onCheck: Function }) => {
    const { todo, onCheck } = props;
    const onCheckHandler = () => {
        onCheck(todo);
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
        </li>
    );
};

export default TodoContent;