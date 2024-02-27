import { TodoContext } from "@/contexts/TodoContext";
import { useContextSelector } from "use-context-selector";

export default function useTodoListItem() {
  const handleToggleTodo = useContextSelector(
    TodoContext,
    (state) => state.handleToggleTodo,
  );
  const handleRemoveTodo = useContextSelector(
    TodoContext,
    (state) => state.handleRemoveTodo,
  );

  if (handleToggleTodo === undefined) {
    throw new Error(
      "handleToggleTodo pode ser chamado apenas dentro do TodoContext",
    );
  }
  if (handleRemoveTodo === undefined) {
    throw new Error(
      "handleRemoveTodo pode ser chamado apenas dentro do TodoContext",
    );
  }

  return { handleToggleTodo, handleRemoveTodo };
}
