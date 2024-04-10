"use client";

import Chat from "@/components/chat/chat";
import Settings from "@/components/settings/settings";
import { UseEmailProvider } from "@/hooks/use-email-mode";
import { UseGSuiteServiceProvider } from "@/hooks/use-gsuite-service";
import { EmailMode, GSuiteService } from "@/lib/types";
import { useState } from "react";

export default function Interface() {
  const [emailMode, setEmailMode] = useState<EmailMode>(EmailMode.DRAFT);
  const [gsuiteService, setGSuiteService] = useState<GSuiteService>(GSuiteService.DRIVE);
  return (
    <UseEmailProvider.Provider value={{ emailMode, setEmailMode }}>
      <UseGSuiteServiceProvider.Provider value={{ gsuiteService, setGSuiteService }}>
      <Chat />
      <Settings />
      </UseGSuiteServiceProvider.Provider>
    </UseEmailProvider.Provider>
  );
}
