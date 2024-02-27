import useTodoListItem from "@/hooks/useTodoListItem";
import { TodoDTO } from "@/models/todo";
import { Trash2 } from "lucide-react";
import { memo } from "react";

type Props = {
  todo: TodoDTO;
};

function TodoListItem({ todo }: Readonly<Props>) {
  console.log("Renderizando TodoListItem");

  const { handleToggleTodo, handleRemoveTodo } = useTodoListItem();

  function onToggleTodo(todoId: string) {
    handleToggleTodo(todoId);
  }

  function handleRemove(todoId: string) {
    handleRemoveTodo(todoId);
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
