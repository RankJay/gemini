import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGSuiteService } from "@/hooks/use-gsuite-service";
import { EmailMode, GSuiteService } from "@/lib/types";
import GSuiteDriveSettings from "./drive/drive";
import GSuiteMeetSettings from "./meet/meet";
import { Input } from "@/components/ui/input";
import { useEmail } from "@/hooks/use-email-mode";
import { Button } from "@/components/ui/button";

function DraftEmailGSuiteSettings() {
  return (
    <>
      <Input placeholder="Subject: You are using a great product!" />
      <Input
        placeholder="To: sundar.p@google.com"
        pattern="^([a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\\\. [a-zA-Z]{2,}$/"
      />
      <Button>Send email</Button>
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

export default function GSuiteSettings() {
  const { setGSuiteService } = useGSuiteService();
  const { emailMode } = useEmail();

  return (
    <>
      {emailMode === EmailMode.DRAFT && <DraftEmailGSuiteSettings />}
      {emailMode === EmailMode.SEARCH && <SearchEmailGSuiteSettings />}
      <Tabs defaultValue={GSuiteService.DRIVE} className="w-[200px]">
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
  );
}
