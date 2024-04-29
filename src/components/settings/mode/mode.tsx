"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmail } from "@/hooks/use-email-mode";
import { EmailMode as mode } from "@/lib/types";

export default function EmailMode() {
  const { setEmailMode } = useEmail();
  return (
    <Tabs defaultValue={mode.DRAFT} className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger
          value={mode.DRAFT}
          onClick={() => setEmailMode(mode.DRAFT)}
        >
          Draft
        </TabsTrigger>
        {/* <TabsTrigger
          value={mode.SEARCH}
          onClick={() => setEmailMode(mode.SEARCH)}
        >
          Search
        </TabsTrigger> */}
      </TabsList>
    </Tabs>
  );
}
