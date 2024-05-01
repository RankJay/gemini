"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function TrainingSettings() {
  const [disabled, setDisabled] = useState(false);
  const [emailData, setEmailData] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Train Gemini");

  useEffect(() => {
    const auth = getCookie("auth");

    if (!auth) {
      setDisabled(true);
    }
  }, [emailData]);


  const onClick = async (event: any) => {
    event.preventDefault();
    toast({
      title: "Email AI",
      description: "Training model...",
    });
    setStatus("Training...");
    setDisabled(true);

    const response = await fetch("/api/train", {
      method: "POST",
    });

    if (!response.ok) {
      toast({
        title: "Email AI",
        description: "Failed to train model.",
      });

      setStatus("Train Gemini");
      setDisabled(false);
      return;
    } else {
      toast({
        title: "Email AI",
        description: "Model trained successfully.",
      });
      setEmailData(emailData as string);
      setStatus("Model Trained");
      setDisabled(true);
    }
  };
  return (
      <Button disabled={disabled} onClick={onClick}>
        {status}
      </Button>
  );
}
