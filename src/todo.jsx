import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./todo.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Function to get stored todos from local storage
    const getStoredTodos = () => {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      console.log("Stored Todos:", storedTodos);
      return storedTodos;
    };

    // Load todos from local storage when the component mounts
    const todos = getStoredTodos();
    setTodos(todos);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => {
        const updatedTodos = [
          ...prevTodos,
          {
            id: todos.length + 1,
            text: newTodo.toUpperCase(),
            completed: false,
          },
        ];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <div className="img-div">
      <div id="main-div" className="container">
        <div id="h1-div">
          <h1>TODO APP</h1>
        </div>

        <input
          className="form-control xsw-50"
          id="todo-add"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <Button className="mt-4" variant="warning" onClick={addTodo}>
          ADD TODO
        </Button>

        {todos.length === 0 ? (
          <h3 className="mt-2 text-danger">NO TASKS TO DO</h3>
        ) : (
          <ul className="list-group">
            {todos.map((todo) => (
              <li key={todo.id} className="list-group-item d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    id={`checkbox-${todo.id}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`checkbox-${todo.id}`}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  className="ms-3 mt-2 btn-sm float-right"
                  variant="outline-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  DELETE
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
