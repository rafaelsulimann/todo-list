import { TodoDTO } from "@/models/todo";
import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

type Props = {
  children: ReactNode;
};

type TodoContextType = {
  todos: TodoDTO[] | undefined;
  handleToggleTodo: (todoId: string) => void | undefined;
  handleRemoveTodo: (todoId: string) => void | undefined;
  handleSubmitTodo: (todo: TodoDTO) => void | undefined;
};

export const TodoContext = createContext({} as TodoContextType);

export function TodoProvider({ children }: Readonly<Props>) {
  console.log("Renderizando TodoContext");
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
    <TodoContext.Provider
      value={{ todos, handleToggleTodo, handleRemoveTodo, handleSubmitTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
