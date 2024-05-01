import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useEmailBody } from "@/hooks/use-email-body";
import { FormEvent, useEffect, useState } from "react";

interface SendEmailWithDialogProps {
  recipientEmail: string;
  subject: string;
}

export default function SendEmailWithDialog(input: SendEmailWithDialogProps) {
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const { emailBody, setEmailBody } = useEmailBody();

  useEffect(() => {
    setRecipientEmail(input.recipientEmail);
    setSubject(input.subject);
  }, [input.recipientEmail, input.subject])
  const onSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        subject: subject,
        to: recipientEmail,
        message: emailBody,
      }),
    });

    if (!response.ok) {
      toast({
        title: "Error",
        description: "Failed to send email",
      })
    } else {
      toast({
        title: "Success",
        description: "Email sent successfully",
      })
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will send the email to the
            receiver.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="receipient"
              value={recipientEmail}
              className="col-span-3"
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="subject"
              value={subject}
              className="col-span-3"
              onChange={(e) => setSubject(e.target.value)}
            />
            <Textarea
              id="body"
              value={emailBody}
              className="col-span-4 h-52"
              onChange={(e) => {
                setEmailBody(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Send email</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
