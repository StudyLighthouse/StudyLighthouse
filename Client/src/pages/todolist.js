import { useState } from 'react';
import Header from '../components/Navbar'

function ToDo() {
    const [todoInput, updateInput] = useState('');
    const [startOnInput, updateStartOnInput] = useState('');
    const [endByInput, updateEndByInput] = useState('');
    const [todoList, updateTodos] = useState([
        { id: 1, task: 'Learn React', startOn: '9am', endBy: '12pm', addedOn: new Date().toLocaleDateString() },
        { id: 2, task: 'Learn Angular', startOn: '1pm', endBy: '4pm', addedOn: new Date().toLocaleDateString() },
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
        <div className="justify-center items-center pt-3">
        <Header/>
        <div className="p-16 rounded shadow-md w-auto">
            <h3 className="text-center"></h3>
            <div className="flex space-x-2">
                <input
                    className="form-control flex-1 border rounded px-3 py-2"
                    onChange={(e) => updateInput(e.target.value)}
                    placeholder="Add a task"
                    type="text"
                    value={todoInput}
                />
                <label className='text-white font-bold'>To start on:</label>
                <input
                    className="form-control flex-1 border rounded px-3 py-2"
                    onChange={(e) => updateStartOnInput(e.target.value)}
                    
                    placeholder="To Start On"
                    type="date"
                    value={startOnInput}
                />
               <label className='text-white font-bold'>To end by:</label>

                <input
                    className="form-control flex-1 border rounded px-3 py-2"
                    onChange={(e) => updateEndByInput(e.target.value)}
                    placeholder="To End By"
                    type="date"
                    value={endByInput}
                />
                <button onClick={isEditing ? updateTodo : addNewTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {isEditing ? 'Update' : 'Add'}
                </button>
            </div>
            <ul className="list-group mt-4 space-y-2">
                {todoList.map((todo) => (
                    <li key={todo.id} className="list-group-item flex justify-between items-center p-3 border rounded">
                        <div>
                            <p className='text-white'>{todo.task}</p>
                            <small className="text-gray-500">Start on: {todo.startOn} | End by: {todo.endBy} | Added on: {todo.addedOn}</small>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => startEditing(todo)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                            <button onClick={() => deleteTodo(todo.id)} className="bg-white-500 text-white px-2 py-1 rounded">❌</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default ToDo;