"use client";

import Chat from "@/components/chat/chat";
import Settings from "@/components/settings/settings";
import { UseEmailBodyProvider } from "@/hooks/use-email-body";
import { UseEmailProvider } from "@/hooks/use-email-mode";
import { UseGSuiteServiceProvider } from "@/hooks/use-gsuite-service";
import { EmailMode, GSuiteService } from "@/lib/types";
import { useState } from "react";

export default function Interface() {
  const [emailMode, setEmailMode] = useState<EmailMode>(EmailMode.DRAFT);
  const [gsuiteService, setGSuiteService] = useState<GSuiteService>(
    GSuiteService.DRIVE
  );
  const [emailBody, setEmailBody] = useState<string>("");
  return (
    <UseEmailProvider.Provider value={{ emailMode, setEmailMode }}>
      <UseGSuiteServiceProvider.Provider
        value={{ gsuiteService, setGSuiteService }}
      >
        <UseEmailBodyProvider.Provider value={{ emailBody, setEmailBody }}>
          <Chat />
          <Settings />
        </UseEmailBodyProvider.Provider>
      </UseGSuiteServiceProvider.Provider>
    </UseEmailProvider.Provider>
  );
}
