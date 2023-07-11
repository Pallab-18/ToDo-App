import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputvalue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            }

            setTodos([...todos, newTodo]);
            setInputvalue('');
        }

    }

    const deleteTodo = (id) => {

        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }


    const editTodo = (id, text) => {
        setEditMode(true);
        setEditId(id);
        setEditValue(text);

    }

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === editId) {
                return { ...todo, text: editValue };
            }
            return todo;
        });

        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
    }

    return (
        <div className='todo-container'>
            <h2>ToDo List</h2>
            <input type='text' value={inputValue} onChange={(e) =>
                setInputvalue(e.target.value)
            } />
            {
                editMode ? (
                    <div>
                        <input type='text'
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)} />
                        <button onClick={updateTodo}>Update</button>
                    </div>
                ) : (
                    <button onClick={addTodo}>Add</button>

                )
            }



            <ol>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <div>
                            <button onClick={() =>
                                deleteTodo(todo.id)
                            }>Delete</button>
                            <button onClick={() =>
                                editTodo(todo.id, todo.text)
                            }>Edit</button></div>
                    </li>

                ))}

            </ol>


        </div>
    )
}

export default Todo
