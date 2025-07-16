import React, { useState } from "react";
import ToDoList from "./types/todo";
import TODOCrud from "./TODOCrud";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./index.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDoList[]>(TODOCrud.getTodos());

  const handleAdd = (text: string) => {
    const newTodo = TODOCrud.addTodos(text);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdate = (todo: ToDoList) => {
    TODOCrud.updateTodo(todo);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
  };

  const handleDelete = (id: number) => {
    TODOCrud.deleteTodos(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default App;
