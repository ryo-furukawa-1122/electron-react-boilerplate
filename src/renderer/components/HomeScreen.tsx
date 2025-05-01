import { useState, useEffect } from 'react';
import TodoContent, { loadTodoList, storeTodoList } from './TodoContent';
import { Todo } from '../types/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const HomeScreen = () => {
  // Define the state
  const [title, setTitle] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  useEffect(() => {
    // Set the initial data
    // const defaultTodoList: Todo[] = [
    //   {
    //     id: 1,
    //     title: 'Write the paper',
    //     completed: true,
    //   },
    //   {
    //     id: 2,
    //     title: 'Make the cover letter',
    //     completed: false,
    //   },
    //   {
    //     id: 3,
    //     title: 'Submit the paper',
    //     completed: false,
    //   },
    // ];

    // setTodoList(defaultTodoList);

    // Load the todo list from the database
    loadTodoList().then((todoList) => {
      if (todoList) {
        setTodoList(todoList);
      }
    })

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
      storeTodoList(newTodoList);

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
    storeTodoList(newTodoList);
  };

  // Function to reorder the tasks
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    if (!destination) return;

    const newList = Array.from(todoList);
    const [movedItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, movedItem);

    setTodoList(newList);
    storeTodoList(newList);
  }

  // Function to delete a task
  const onDelete = (target: Todo) => {
    const newTodoList = todoList.filter((todo) => todo.id !== target.id);
    setTodoList(newTodoList);
    storeTodoList(newTodoList);
  }

  return (
    <div className='container'>
      
      {/* <ul className="todo-list">
        {todoList?.map((todo) => {
          return <TodoContent key={todo.id} todo={todo} onCheck={onCheck} />;
          })}
          </ul> */}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((todo, index) => (
                <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <li ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps} className={`todo-item ${snapshot.isDragging ? 'draging' : ''}`}>
                      <TodoContent todo={todo} onCheck={onCheck} onDelete={onDelete} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="input-field">
        <input
          type='text'
          placeholder='Add a new task'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAdd();
            }
          }}
        />
        <button onClick={onAdd} className='add-todo-button'>
          Add
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;