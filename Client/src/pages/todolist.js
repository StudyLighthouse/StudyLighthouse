import React, { useState } from 'react';
import '../styles/todolist.css';

function ToDo() {
    const [todoInput, updateInput] = useState('');
    const [startOnInput, updateStartOnInput] = useState('');
    const [endByInput, updateEndByInput] = useState('');
    const [todoList, updateTodos] = useState([
    ]);
    const [nextId, setNextId] = useState(3);
    const [isEditing, setIsEditing] = useState(null);

    function addNewTodo() {
        if (todoInput === '') {
            alert('Add some task');
        } else {
            let newTodos = [
                ...todoList,
                {
                    id: nextId,
                    task: todoInput,
                    startOn: startOnInput,
                    endBy: endByInput,
                    addedOn: new Date().toLocaleDateString()
                },
            ];
            updateTodos(newTodos);
            updateInput('');
            updateStartOnInput('');
            updateEndByInput('');
            setNextId(nextId + 1); // Increment nextId correctly
        }
    }

    function deleteTodo(id) {
        let filteredTodos = todoList.filter((todo) => todo.id !== id);
        updateTodos(filteredTodos);
    }

    function startEditing(todo) {
        setIsEditing(todo.id);
        updateInput(todo.task);
        updateStartOnInput(todo.startOn);
        updateEndByInput(todo.endBy);
    }

    function updateTodo() {
        const updatedTodos = todoList.map(todo =>
            todo.id === isEditing ? {
                ...todo,
                task: todoInput,
                startOn: startOnInput,
                endBy: endByInput,
            } : todo
        );
        updateTodos(updatedTodos);
        setIsEditing(null);
        updateInput('');
        updateStartOnInput('');
        updateEndByInput('');
    }

    return (
        <div className="todo-container mt-5 w-50">
            <h3 className="text-center">Todo App using React</h3>
            <div className="input-group">
                <input
                    className="form-control"
                    onChange={(e) => updateInput(e.target.value)}
                    placeholder="Add a task"
                    type="text"
                    value={todoInput}
                />
                <input
                    className="form-control"
                    onChange={(e) => updateStartOnInput(e.target.value)}
                    placeholder="To Start On"
                    type="date"
                    value={startOnInput}
                />
                <input
                    className="form-control"
                    onChange={(e) => updateEndByInput(e.target.value)}
                    placeholder="To End By"
                    type="date"
                    value={endByInput}
                />
                <button onClick={isEditing ? updateTodo : addNewTodo} className="btn btn-primary">
                    {isEditing ? 'Update' : 'Add'}
                </button>
            </div>
            <ul className="list-group mt-4">
                {todoList.map((todo) => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <p>{todo.task}</p>
                            <small>Start on: {todo.startOn} | End by: {todo.endBy} | Added on: {todo.addedOn}</small>
                        </div>
                        <div>
                            <button onClick={() => startEditing(todo)} className="btn btn-secondary btn-sm me-2">Edit</button>
                            <button onClick={() => deleteTodo(todo.id)} className="btn btn-sm">❌</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;