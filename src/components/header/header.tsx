import Profile from "./profile";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center justify-between gap-1 border-b bg-background px-4">
      <h1 className="text-xl tracking-tight font-bold">Email AI</h1>
      <Profile />
    </header>
  );
}
