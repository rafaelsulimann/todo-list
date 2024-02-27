import TodoForm from "../TodoForm";
import TodoList from "../TodoList";
import { TodoProvider } from "@/contexts/TodoContext";

export default function TodoMain() {
  console.log("Renderizando TodoMain");

  return (
    <TodoProvider>
      <main className="container-sulimann space-y-6">
        <TodoForm />
        <TodoList />
      </main>
    </TodoProvider>
  );
}
