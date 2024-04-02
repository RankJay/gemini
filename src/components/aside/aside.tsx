import { Triangle, SquareTerminal } from "lucide-react";
import { Button } from "../ui/button";

export default function AsideNavigationBar() {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg bg-muted"
          aria-label="Playground"
        >
          <SquareTerminal className="size-5" />
        </Button>
      </nav>
    </aside>
  );
}
