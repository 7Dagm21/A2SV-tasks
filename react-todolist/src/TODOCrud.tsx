import ToDoList from "./types/todo";

const Local_Storage_Key = "todos";

const TODOCrud = {
  getTodos: (): ToDoList[] => {
    const todoStr = localStorage.getItem(Local_Storage_Key);
    return todoStr ? JSON.parse(todoStr) : [];
  },

  addTodos: (text: string): ToDoList => {
    const todos = TODOCrud.getTodos();
    const newTodo: ToDoList = {
      id: Date.now(),
      text,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos));
    return newTodo;
  },

  updateTodo: (todo: ToDoList): ToDoList => {
    const todos = TODOCrud.getTodos();
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos));
    return todo;
  },

  deleteTodos: (id: number): void => {
    const todos = TODOCrud.getTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos));
  },
};

export default TODOCrud;
