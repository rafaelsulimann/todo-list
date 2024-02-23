import TodoListItem from "../TodoListItem";
import { useTodoContext } from "@/contexts/todo-context";

export default function TodoList() {
  console.log("Renderizando TodoList");
  const { todos } = useTodoContext();
  return (
    <section>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
