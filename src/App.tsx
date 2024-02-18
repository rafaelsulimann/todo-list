import { useForm } from "react-hook-form";
import { Input } from "./components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const todoSchema = z.object({
  value: z.string().min(1, "Campo Obrigatório"),
});

type TodoSchema = z.infer<typeof todoSchema>;

export default function App() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
  });

  function setInputBorder(value: string | undefined) {
    return value
      ? "border-red-600 focus-visible:ring-red-600"
      : "border-zinc-400";
  }

  function handleTodo(data: any) {
    console.log(data);
    clearErrors();
    reset();
  }

  // Função para tratar o evento onKeyDown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "enter") {
      // Evita o comportamento padrão do Enter, que poderia recarregar a página
      event.preventDefault();
      // Submete o formulário
      handleSubmit(handleTodo); // Imediatamente invoca a função retornada por handleSubmit
    }
  };

  return (
    <div
      id="app"
      className="box-border flex h-screen w-full max-w-screen-xl flex-col bg-zinc-700 p-5 font-['Assistant'] text-[1rem] text-zinc-100"
    >
      <header>
        <h1 className="text-center text-5xl font-bold">TODO</h1>
      </header>
      <main className="mt-10">
        <section className="container">
          <form onSubmit={handleSubmit(handleTodo)}>
            <Input
              className={`${setInputBorder(errors.value?.message)} h-16 text-lg placeholder:italic placeholder:text-zinc-400`}
              placeholder="O que deseja fazer?"
              type="text"
              id="value"
              onKeyDown={handleKeyDown} // Adiciona o manipulador de eventos onKeyDown
              {...register("value")}
            />
            {errors.value && (
              <div className="mt-[0.125rem] text-base text-red-600">
                {errors.value.message}
              </div>
            )}
          </form>
        </section>
        <section />
      </main>
    </div>
  );
}
