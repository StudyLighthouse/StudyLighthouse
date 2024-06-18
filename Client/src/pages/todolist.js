import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/todolist.css';
import { useSession } from '../contexts/SessionContext';
import Header from '../components/Navbar';

function ToDo() {
    const [todoInput, updateInput] = useState('');
    const [startOnInput, updateStartOnInput] = useState('');
    const [endByInput, updateEndByInput] = useState('');
    const [todoList, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null); // New state for tracking the todo being edited
    const { user } = useSession();

    const fetchTodos = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/get_todos", { 'cred': user });
            const todos = response.data;
            console.log(todos);
            setTodos(todos);
        } catch (e) {
            console.log(`error: ${e}`);
            toast.error("Error fetching todos");
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const addNewTodo = async () => {
        if (todoInput === '') {
            toast.error('Please add a task');
        } else {
            let newTodos = {
                task: todoInput,
                startOn: startOnInput,
                endBy: endByInput,
            }
            try {
                const response = await axios.post("http://127.0.0.1:5000/add_todo", { 'cred': user, 'todo': newTodos });
                toast.success(response.data.message);
                updateInput('');
                updateStartOnInput('');
                updateEndByInput('');
                fetchTodos();
            } catch (e) {
                console.log(e);
                toast.error('Error adding todo');
            }
        }
    }

    const updateTodo = async (id) => {
        if (todoInput === '') {
            toast.error('Task cannot be empty');
            return;
        }
        let updatedTodo = {
            task: todoInput,
            startOn: startOnInput,
            endBy: endByInput,
        }
        try {
            const response = await axios.post("http://127.0.0.1:5000/update_todo", { 'cred': user, 'id': id, 'todo': updatedTodo });
            toast.success(response.data.message);
            updateInput('');
            updateStartOnInput('');
            updateEndByInput('');
            setEditingTodo(null); // Reset editing todo
            fetchTodos();
        } catch (e) {
            console.log(e);
            toast.error('Error updating todo');
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/delete_todo", { 'cred': user, 'id': id });
            toast.success(response.data.message);
            fetchTodos();
        } catch (e) {
            console.log(e);
            toast.error('Error deleting todo');
        }
    }

    const startEditing = (todo) => {
        setEditingTodo(todo.id);
        updateInput(todo.task);
        updateStartOnInput(todo.start_date);
        updateEndByInput(todo.end_date);
    }

    return (
        <div className='h-screen w-screen'>
            <Header />
            <div className="main-content">
                <div className="todo-container mt-5 w-50 custom-container">
                    <h1 className="text-center font-bold ">STUDY LIGHTHOUSE's TO-DO-LIST</h1>
                    <div className="input-group custom-input-group">
                        <label className="form-label">Task</label>
                        <input
                            className="form-control"
                            onChange={(e) => updateInput(e.target.value)}
                            placeholder="Add a task"
                            type="text"
                            value={todoInput}
                        />
                        <h3 className='form-label'>TO START ON</h3>
                        <input
                            className="form-control"
                            onChange={(e) => updateStartOnInput(e.target.value)}
                            type="date"
                            value={startOnInput}
                        />
                        <h3 className='form-label'>TO END BY</h3>
                        <input
                            className="form-control"
                            onChange={(e) => updateEndByInput(e.target.value)}
                            type="date"
                            value={endByInput}
                        />
                        <center>
                        {editingTodo ? (
                            <button className="add-button" onClick={() => updateTodo(editingTodo)}>
                                Update
                            </button>
                        ) : (
                            <button className="add-button" onClick={addNewTodo}>
                                Add
                            </button>
                        )}
                        </center>
                    </div>
                    <ul className="list-group mt-4 custom-list-group">
                        {todoList.map((todo, index) => (
                            <form key={index} className="list-group-item d-flex justify-content-between align-items-center mb-3 border-white border-2 custom-list-group-item">
                                <div>
                                    <p className='text-black custom-list-group-item p'>{todo['task']}</p>
                                    <small className='text-black custom-list-group-item small'>Start on: {todo['start_date']} | End by: {todo['end_date']} |<br></br> Added on: {todo['timestamp']}</small>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-secondary btn-sm me-2 custom-list-group-item button" onClick={() => startEditing(todo)}>Edit</button>
                                    <br></br>
                                    <button type="button" className="btn btn-sm custom-list-group-item button delete-button" onClick={() => deleteTodo(todo.id)}>❌</button>
                                </div>
                            </form>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ToDo;