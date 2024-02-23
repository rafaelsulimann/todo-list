import { TodoDTO } from "@/models/todo";
import { Dispatch, createContext, useContext } from "react";

export type TodoContextType = {
  todos: TodoDTO[] | undefined;
  setTodos: Dispatch<React.SetStateAction<TodoDTO[]>>;
};

export const TodoContext = createContext<TodoContextType>({
  todos: undefined,
  setTodos: () => {},
});

export function useTodoContext() {
  const { todos, setTodos } = useContext(TodoContext);

  if (todos === undefined) {
    throw new Error("Todo pode ser chamado apenas dentro do TodoContext");
  }

  return { todos, setTodos };
}
