import { useState } from "react";
import { Plus, Check, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggle = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const remove = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const pending = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 pt-[12vh]">
      <div className="w-full max-w-lg">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Todos
        </h1>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="mb-8 flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="h-11 flex-1 bg-card text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" size="icon" className="h-11 w-11 shrink-0">
            <Plus className="h-5 w-5" />
          </Button>
        </form>

        {/* Pending */}
        {pending.length > 0 && (
          <ul className="space-y-1">
            {pending.map((t) => (
              <TodoItem key={t.id} todo={t} onToggle={toggle} onRemove={remove} />
            ))}
          </ul>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Completed — {completed.length}
            </p>
            <ul className="space-y-1">
              {completed.map((t) => (
                <TodoItem key={t.id} todo={t} onToggle={toggle} onRemove={remove} />
              ))}
            </ul>
          </div>
        )}

        {todos.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No todos yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
};

function TodoItem({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <li className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-card">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          todo.done
            ? "border-accent bg-accent text-accent-foreground"
            : "border-muted-foreground/40 hover:border-primary"
        }`}
      >
        {todo.done && <Check className="h-3 w-3" />}
      </button>
      <span
        className={`flex-1 text-sm transition-colors ${
          todo.done ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onRemove(todo.id)}
        className="text-muted-foreground/0 transition-colors group-hover:text-destructive"
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
}

export default Index;
