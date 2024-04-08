"use client";

import Chat from "@/components/chat/chat";
import Settings from "@/components/settings/settings";
import { UseEmailProvider } from "@/hooks/use-email-mode";
import { EmailMode } from "@/lib/types";
import { useState } from "react";

export default function Interface() {
  const [emailMode, setEmailMode] = useState<EmailMode>(EmailMode.DRAFT);
  return (
    <UseEmailProvider.Provider value={{ emailMode, setEmailMode }}>
      <Chat />
      <Settings />
    </UseEmailProvider.Provider>
  );
}
