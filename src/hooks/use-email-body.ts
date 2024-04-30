"use client";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type UseEmailBodyContextProviderProps = {
  emailBody: string;
  setEmailBody: Dispatch<SetStateAction<string>>;
};

export const UseEmailBodyProvider = createContext<UseEmailBodyContextProviderProps>({
  emailBody: "",
  setEmailBody: () => {},
});

export const useEmailBody = () => {
  const context = useContext(UseEmailBodyProvider);
  if (!context) {
    throw new Error(
      "UseEmailBodyContext must be used within the UseEmailBodyProvider"
    );
  }
  return context;
};
