import { useForm } from "react-hook-form";
import { Input } from "./components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TodoDTO } from "./models/todo";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const todoSchema = z.object({
  value: z.string().min(1, "Campo Obrigatório"),
});

type TodoSchema = z.infer<typeof todoSchema>;

export default function App() {
  const [todos, setTodos] = useState<TodoDTO[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
  });

  function clearInput() {
    clearErrors();
    reset();
  }

  function handleTodo(data: TodoSchema) {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title: data.value,
        checked: false,
      },
    ]);
    clearInput();
  }

  function submitForm() {
    handleSubmit(handleTodo);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "enter") {
      event.preventDefault();
      submitForm();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      clearInput();
    }
  };

  function onToggleTodo(todoId: string) {
    setTodos(
      todos.map((obj) =>
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
    setTodos(todos.filter((obj) => obj.id !== todoId));
  }

  return (
    <div id="app" className="space-y-8">
      <header>
        <h1 className="text-center text-5xl font-bold">TODO</h1>
      </header>
      <main className="container-sulimann space-y-6">
        <section>
          <form onSubmit={handleSubmit(handleTodo)}>
            <Input
              className={[
                "h-16 text-lg shadow-xl placeholder:italic placeholder:text-zinc-400",
                errors.value?.message
                  ? "border-red-600 focus-visible:ring-red-600"
                  : "border-zinc-400",
              ].join(" ")}
              placeholder="O que deseja fazer?"
              type="text"
              id="value"
              onKeyDown={handleKeyDown}
              {...register("value")}
            />
            {errors.value && (
              <div className="mt-[0.125rem] text-base text-red-600">
                {errors.value.message}
              </div>
            )}
          </form>
        </section>
        <section>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
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
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
