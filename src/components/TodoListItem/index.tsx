import { TodoDTO } from "@/models/todo";
import { Trash2 } from "lucide-react";
import { memo } from "react";

type Props = {
  todo: TodoDTO;
  handleToggleTodo: (todoId: string) => void;
  handleRemoveTodo: (todoId: string) => void;
};

function TodoListItem({
  todo,
  handleToggleTodo,
  handleRemoveTodo,
}: Readonly<Props>) {
  console.log("Renderizando TodoListItem");
  function onToggleTodo(todoId: string) {
    handleToggleTodo(todoId);
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
    handleRemoveTodo(todoId);
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
        onClick={() => onToggleTodo(todo.id)}
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

export default memo(TodoListItem);
