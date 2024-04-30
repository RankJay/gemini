"use client";

import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { EventHandler, useEffect, useState } from "react";

export default function TrainingSettings() {
  const [disabled, setDisabled] = useState(false);
  const [emailData, setEmailData] = useState<string | null>(null);

  useEffect(() => {
    const emailData = getCookie("emaildata");
    const auth = getCookie("auth");
    if (!auth) {
        setDisabled(true);
    }
    if (!emailData) {
      return;
    } else {
      setEmailData(emailData as string);
    }
  }, [emailData]);
  const onClick = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/train", {
      method: "POST",
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return;
    }
    const emailData = getCookie("emaildata");
    console.log(emailData);
    if (!emailData) {
      return;
    } else {
      setEmailData(emailData as string);
    }
  };
  return !emailData && <Button disabled={disabled} onClick={onClick}>Train model</Button>;
}
