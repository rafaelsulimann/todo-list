import TodoListItem from "../TodoListItem";
import useTodoList from "@/hooks/useTodoList";

export default function TodoList() {
  console.log("Renderizando TodoList");
  const { todos } = useTodoList();

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
