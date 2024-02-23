import { useTodoContext } from "@/contexts/todo-context";
import { TodoDTO } from "@/models/todo";
import { Trash2 } from "lucide-react";

type Props = {
  todo: TodoDTO;
};

export default function TodoListItem({ todo }: Props) {
  console.log("Renderizando TodoListItem");
  const { setTodos } = useTodoContext();
  function onToggleTodo(todoId: string) {
    setTodos((currentTodos) =>
      currentTodos.map((obj) =>
        obj.id === todoId ? { ...obj, checked: !obj.checked } : obj,
      ),
    );
  }

  function handleTodoClick(todoId: string) {
    onToggleTodo(todoId);
  }

  function handleTodoKeyDown(
    todoId: string,
    event: React.KeyboardEvent<HTMLSpanElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      onToggleTodo(todoId);
    }
  }

  function handleRemove(todoId: string) {
    setTodos((currentTodos) => currentTodos.filter((obj) => obj.id !== todoId));
  }
  return (
    <li
      className={[
        "flex h-20 items-center justify-between rounded-md bg-zinc-900 p-4 ",
        todo.checked ? "text-zinc-600 line-through" : "text-zinc-200",
      ].join(" ")}
    >
      <span
        className="cursor-pointer text-lg"
        onClick={() => handleTodoClick(todo.id)}
        onKeyDown={(event) => handleTodoKeyDown(todo.id, event)}
        role="button"
        tabIndex={0}
      >
        {todo.title}
      </span>
      <Trash2
        className="cursor-pointer text-red-400"
        onClick={() => handleRemove(todo.id)}
      />
    </li>
  );
}
