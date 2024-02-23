import { TodoDTO } from "@/models/todo";
import { useCallback, useState } from "react";
import TodoForm from "../TodoForm";
import { TodoContext } from "@/contexts/todo-context";
import TodoList from "../TodoList";

export default function TodoMain() {
  console.log("Renderizando TodoMain");
  const [todos, setTodos] = useState<TodoDTO[]>([]);

  const handleToggleTodo = useCallback((todoId: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((obj) =>
        obj.id === todoId ? { ...obj, checked: !obj.checked } : obj,
      ),
    );
  }, []);

  const handleRemoveTodo = useCallback((todoId: string) => {
    setTodos((currentTodos) => currentTodos.filter((obj) => obj.id !== todoId));
  }, []);

  const handleSubmitTodo = useCallback((todo: TodoDTO) => {
    setTodos((currentTodos) => [...currentTodos, todo]);
  }, []);

  return (
    <TodoContext.Provider value={{ todos }}>
      <main className="container-sulimann space-y-6">
        <TodoForm handleSubmitTodo={handleSubmitTodo} />
        <TodoList
          handleToggleTodo={handleToggleTodo}
          handleRemoveTodo={handleRemoveTodo}
        />
      </main>
    </TodoContext.Provider>
  );
}
