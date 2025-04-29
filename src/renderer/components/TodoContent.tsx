import { Todo } from "../types/types";

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