import * as React from "react"
 
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function GSuiteDriveSettings() {
    // Dummy data for tags
    const tags = [
      "Tag 1",
      "Tag 2",
      "Tag 3"
    ];

    return (
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Suggested Documents</h4>
            {tags.map((tag, index) => (
              <div key={index} className="text-sm">
                {tag}
                {index < tags.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      )
}
