import { memo } from "react";
import TodoListItem from "../TodoListItem";
import { useTodoContext } from "@/contexts/todo-context";

type Props = {
  handleToggleTodo: (todoId: string) => void;
  handleRemoveTodo: (todoId: string) => void;
};

function TodoList({ handleToggleTodo, handleRemoveTodo }: Readonly<Props>) {
  console.log("Renderizando TodoList");
  const { todos } = useTodoContext();
  return (
    <section>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleToggleTodo={handleToggleTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        ))}
      </ul>
    </section>
  );
}

export default memo(TodoList);
