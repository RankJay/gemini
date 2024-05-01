import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { getCookie } from "cookies-next";

export default function GSuiteDriveSettings() {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>(
    "Please sign in to view documents."
  );

  React.useEffect(() => {
    const token = getCookie("auth");
    if (token) {
      setError("Loading...");
      fetch("/api/drive", {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTags(data);
        })
        .catch((error) => {
          setError("Failed to load documents.");
        });
    }
  }, []);

  return (
    <ScrollArea className="h-44 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Suggested Documents
        </h4>
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <div key={index} className="text-sm">
              {tag}
              {index < tags.length - 1 && <Separator className="my-2" />}
            </div>
          ))
        ) : (
          <div>{error}</div>
        )}
      </div>
    </ScrollArea>
  );
}
