import Header from "./components/Header";
import TodoMain from "./components/TodoMain";

export default function App() {
  console.log("Renderizando App");

  return (
    <div id="app" className="space-y-8">
      <Header />
      <TodoMain />
    </div>
  );
}
