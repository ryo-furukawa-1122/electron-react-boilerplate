import { useState, useEffect } from 'react';
import TodoContent from './TodoContent';
import { Todo } from '../types/types';

const HomeScreen = () => {
  // Define the state
  const [title, setTitle] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  useEffect(() => {
    // Set the initial data
    const defaultTodoList: Todo[] = [
      // {
      //   id: 1,
      //   title: 'Write the paper',
      //   completed: true,
      // },
      // {
      //   id: 2,
      //   title: 'Make the cover letter',
      //   completed: false,
      // },
      // {
      //   id: 3,
      //   title: 'Submit the paper',
      //   completed: false,
      // },
    ];

    setTodoList(defaultTodoList);
  }, []);

  // Function to add a new task
  const onAdd = () => {
    if (title !== '') {
      const newTodoList: Array<Todo> = [
        {
          id: new Date().getTime(),
          title: title, 
          completed: false,
        },
        ...todoList,
      ];
      setTodoList(newTodoList);

      // Clear the input field
      setTitle('');
    }
  };

  // Function to check a task
  const onCheck = (newTodo: Todo) => {
    const newTodoList = todoList.map((todo) => {
      return todo.id == newTodo.id ? { ...newTodo, completed: !newTodo.completed } : todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <div className='container'>
      <div className="input-field">
        <input
          type='text'
          placeholder='Add a new task'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={onAdd} className='add-todo-button'>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todoList?.map((todo) => {
          return <TodoContent key={todo.id} todo={todo} onCheck={onCheck} />;
        })}
      </ul>
    </div>
  );
};

export default HomeScreen;