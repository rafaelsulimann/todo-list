import { TodoDTO } from "@/models/todo";
import { useState } from "react";
import TodoForm from "../TodoForm";
import { TodoContext } from "@/contexts/todo-context";
import TodoList from "../TodoList";

export default function TodoMain() {
  console.log("Renderizando TodoMain");
  const [todos, setTodos] = useState<TodoDTO[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <main className="container-sulimann space-y-6">
        <TodoForm />
        <TodoList />
      </main>
    </TodoContext.Provider>
  );
}
