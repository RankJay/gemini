import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGSuiteService } from "@/hooks/use-gsuite-service";
import { EmailMode, GSuiteService } from "@/lib/types";
import GSuiteDriveSettings from "./drive/drive";
import GSuiteMeetSettings from "./meet/meet";
import { Input } from "@/components/ui/input";
import { useEmail } from "@/hooks/use-email-mode";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SendEmailWithDialog from "./send";

function DraftEmailGSuiteSettings() {
  "use client";

  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <>
      <Input
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <Input
        placeholder="Subject: You are using a great product!"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <SendEmailWithDialog
        subject={subject}
        recipientEmail={recipientEmail}
      />
    </>
  );
}

function SearchEmailGSuiteSettings() {
  return (
    <>
      <Input placeholder="Search for email..." />
      <Button>Search</Button>
    </>
  );
}

function GSuiteSettings() {
  const { setGSuiteService } = useGSuiteService();
  const { emailMode } = useEmail();

  return (
    <>
      {emailMode === EmailMode.DRAFT && (
        <>
          <DraftEmailGSuiteSettings />
          <Tabs defaultValue={GSuiteService.DRIVE}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value={GSuiteService.DRIVE}
                onClick={() => setGSuiteService(GSuiteService.DRIVE)}
              >
                Drive
              </TabsTrigger>
              <TabsTrigger
                value={GSuiteService.MEET}
                onClick={() => setGSuiteService(GSuiteService.MEET)}
              >
                Meet
              </TabsTrigger>
            </TabsList>
            <TabsContent value={GSuiteService.DRIVE}>
              <GSuiteDriveSettings />
            </TabsContent>
            <TabsContent value={GSuiteService.MEET}>
              <GSuiteMeetSettings />
            </TabsContent>
          </Tabs>
        </>
      )}
      {emailMode === EmailMode.SEARCH && <SearchEmailGSuiteSettings />}
    </>
  );
}

export default GSuiteSettings;
