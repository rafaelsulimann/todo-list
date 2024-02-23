import { TodoDTO } from "@/models/todo";
import { createContext, useContext } from "react";

export type TodoContextType = {
  todos: TodoDTO[] | undefined;
};

export const TodoContext = createContext<TodoContextType>({
  todos: undefined,
});

export function useTodoContext() {
  const { todos } = useContext(TodoContext);

  if (todos === undefined) {
    throw new Error("Todo pode ser chamado apenas dentro do TodoContext");
  }

  return { todos };
}
