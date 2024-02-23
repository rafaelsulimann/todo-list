import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useTodoContext } from "@/contexts/todo-context";

const todoSchema = z.object({
  value: z.string().min(1, "Campo Obrigatório"),
});

type TodoSchema = z.infer<typeof todoSchema>;

export default function TodoForm() {
  console.log("Renderizando TodoForm");
  const { setTodos } = useTodoContext();
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
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: uuidv4(),
        title: data.value,
        checked: false,
      },
    ]);
    clearInput();
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "enter") {
      event.preventDefault();
      handleSubmit(handleTodo);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      clearInput();
    }
  };
  return (
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
  );
}
