import { useState } from "react";
import { TodoDTO } from "./models/todo";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoContext } from "./contexts/todo-context";

export default function App() {
  console.log("Renderizando App");
  const [todos, setTodos] = useState<TodoDTO[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <div id="app" className="space-y-8">
        <Header />
        <main className="container-sulimann space-y-6">
          <TodoForm />
          <TodoList />
        </main>
      </div>
    </TodoContext.Provider>
  );
}
