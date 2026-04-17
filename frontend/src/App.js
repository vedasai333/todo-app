import Weather from "./components/Weather";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "http://localhost:5000/api/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title) return;

    const res = await axios.post(API_URL, { title });
    setTodos([...todos, res.data]);
    setTitle("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTodo = async (todo) => {
    const res = await axios.put(`${API_URL}/${todo._id}`, {
      completed: !todo.completed
    });

    setTodos(
      todos.map((t) => (t._id === todo._id ? res.data : t))
    );
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <span
            onClick={() => toggleTodo(todo)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {todo.title}
          </span>

          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
      <Weather/>
    </div>
  );
}

export default App;