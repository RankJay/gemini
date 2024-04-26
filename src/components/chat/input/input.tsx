"use client";

//Hello
import { Label } from "@/components/ui/label";
import { Paperclip, Mic, CornerDownLeft, Settings2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import Settings from "../../settings/settings";
import { Drawer, DrawerContent, DrawerTrigger } from "../../ui/drawer";
import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Message } from "ai/react";

export type ChatInputProps = {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
  setMessages: (messages: Message[]) => void;
};

export default function ChatInput({ input, handleInputChange, handleSubmit, isLoading, setMessages }: ChatInputProps) {
  return (
    <form
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        value={input}
        onChange={handleInputChange}
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button variant="ghost" size="icon">
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Mic className="size-4" />
          <span className="sr-only">Use Microphone</span>
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Settings2 className="size-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <Settings asDrawer={true} />
          </DrawerContent>
        </Drawer>

        <Button type="submit" size="sm" className="ml-auto gap-1.5" onClick={() => setMessages([])} disabled={isLoading} >
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
