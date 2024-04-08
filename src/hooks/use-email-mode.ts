"use client";

import { EmailMode } from "@/lib/types";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type UseEmailContextProviderProps = {
  emailMode: EmailMode;
  setEmailMode: Dispatch<SetStateAction<EmailMode>>;
};

export const UseEmailProvider = createContext<UseEmailContextProviderProps>({
  emailMode: EmailMode.DRAFT,
  setEmailMode: () => {},
});

export const useEmail = () => {
  const context = useContext(UseEmailProvider);
  if (!context) {
    throw new Error(
      "UseEmailContext must be used within the UseEmailProvider"
    );
  }
  return context;
};
