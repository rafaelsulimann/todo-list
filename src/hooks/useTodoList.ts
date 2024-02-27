import { TodoContext } from "@/contexts/TodoContext";
import { useContextSelector } from "use-context-selector";

export default function useTodoList() {
  const todos = useContextSelector(TodoContext, (state) => state.todos);

  if (todos === undefined) {
    throw new Error("Todo pode ser chamado apenas dentro do TodoContext");
  }

  return { todos };
}
