import React, { useState } from "react";
import ToDoList from "../types/todo";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";

interface Props {
  todos: ToDoList[];
  onUpdate: (todo: ToDoList) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEditStart = (todo: ToDoList) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = () => {
    if (editText.trim() !== "" && editId !== null) {
      onUpdate({ id: editId, text: editText, completed: false });
      setEditId(null);
      setEditText("");
    }
  };

  const handleToggleComplete = (todo: ToDoList) => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          {editId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <div className="btn-group">
                <button onClick={handleEditSave} title="Save">
                  <FaCheck />
                </button>
                <button onClick={() => setEditId(null)} title="Cancel">
                  ✖
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
              />
              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </span>
              <div className="btn-group">
                <button onClick={() => handleEditStart(todo)} title="Edit">
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="delete-btn"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
