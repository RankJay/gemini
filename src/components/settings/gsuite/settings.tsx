import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGSuiteService } from "@/hooks/use-gsuite-service";
import { GSuiteService } from "@/lib/types";
import GSuiteDriveSettings from "./drive/drive";
import GSuiteMeetSettings from "./meet/meet";

export default function GSuiteSettings() {
  const { setGSuiteService } = useGSuiteService();
  return (
    <>
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
