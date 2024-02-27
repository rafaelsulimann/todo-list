import { TodoContext } from "@/contexts/TodoContext";
import { useContextSelector } from "use-context-selector";

export default function useTodoForm() {
  const handleSubmitTodo = useContextSelector(
    TodoContext,
    (state) => state.handleSubmitTodo,
  );

  if (handleSubmitTodo === undefined) {
    throw new Error(
      "handleSubmitTodo pode ser chamado apenas dentro do TodoContext",
    );
  }

  return { handleSubmitTodo };
}
