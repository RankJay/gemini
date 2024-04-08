"use client";

import { Sparkles } from "lucide-react";

export const ChatResponseLoading = () => {
  return (
    <div className="w-fit h-auto mb-2 py-2 px-4">
      <Sparkles color="#999" className="size-6 text-primary" />
    </div>
  );
};
