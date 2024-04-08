"use client";

import { Message } from "ai/react";

export type ChatOutputProps = {
  messages: Message[];
};

export default function ChatOutput({ messages }: ChatOutputProps) {
  return (
    <div className="text-black max-h-dvh overflow-y-auto">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
    </div>
  );
}
