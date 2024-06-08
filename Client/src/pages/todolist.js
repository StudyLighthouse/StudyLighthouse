import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

    const fetchTodos= async ()=>{
        try {
            const response = await axios.post("http://127.0.0.1:5000/get_todos", { 'cred': user });
            const todos = response.data;
            console.log(todos);
            setTodos(todos);
          } catch (e) {
            console.log(`error: ${e}`);
            alert("error");
          }
    }
    useEffect(
        ()=>{
            fetchTodos()
        },[]
    )
    const addNewTodo=async ()=> {
        if (todoInput === '') {
            alert('Add some task');
        } else {
            let newTodos ={
                    task: todoInput,
                    startOn: startOnInput,
                    endBy: endByInput,
            }
            try{
                const response=await axios.post("http://127.0.0.1:5000/add_todo", { 'cred': user,'todo':newTodos });
                alert(response.data.message)
                updateInput('')
                updateStartOnInput('')
                updateEndByInput('')
                fetchTodos()
            }
            catch(e){
                console.log(e)
                
            }
        }
    }

    const updateTodo = async (id) => {
        if (todoInput === '') {
            alert('Task cannot be empty');
            return;
        }
        let updatedTodo = {
            task: todoInput,
            startOn: startOnInput,
            endBy: endByInput,
        }
        try {
            const response = await axios.post("http://127.0.0.1:5000/update_todo", { 'cred': user, 'id': id, 'todo': updatedTodo });
            alert(response.data.message);
            updateInput('');
            updateStartOnInput('');
            updateEndByInput('');
            setEditingTodo(null); // Reset editing todo
            fetchTodos();
        } catch (e) {
            console.log(e);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/delete_todo", { 'cred': user, 'id': id });
            alert(response.data.message);
            fetchTodos();
        } catch (e) {
            console.log(e);
        }
    }

    const startEditing = (todo) => {
        setEditingTodo(todo.id);
        updateInput(todo.task);
        updateStartOnInput(todo.start_date);
        updateEndByInput(todo.end_date);
    }

    return (
        
        <div className="todo-container mt-5 w-50">
            <Header/>
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
                {editingTodo ? (
                    <button className="btn btn-primary" onClick={() => updateTodo(editingTodo)}>
                        Update
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={addNewTodo}>
                        Add
                    </button>
                )}
            </div>
            <ul className="list-group mt-4">
                {todoList.map((todo, index) => (
                    <form key={index} className="list-group-item d-flex justify-content-between align-items-center mb-3 border-white border-2">
                        <div>
                            <p className='text-white'>{todo['task']}</p>
                            <small className='text-white'>Start on: {todo['start_date']} | End by: {todo['end_date']} | Added on: {todo['timestamp']}</small>
                        </div>
                        <div>
                            <button type="button" className="btn btn-secondary btn-sm me-2" onClick={() => startEditing(todo)}>Edit</button>
                            <button type="button" className="btn btn-sm" onClick={() => deleteTodo(todo.id)}>❌</button>
                        </div>
                    </form>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;
