"use client";

import { Badge } from "../ui/badge";
import { ChatResponseLoading } from "../ui/loader";
import ChatInput from "./input/input";
import ChatOutput from "./output/output";
import { useChat } from "ai/react";

export default function Chat() {
  const { input, messages, isLoading, handleInputChange, handleSubmit } =
    useChat();
  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <div className="flex-1" style={{
        height: "initial"
      }}>
        {/* This will be used to paste in AI response */}
        <ChatOutput messages={messages} />
      </div>
      {isLoading && <ChatResponseLoading />}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
