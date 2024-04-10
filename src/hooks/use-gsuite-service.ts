"use client";

import { GSuiteService } from "@/lib/types";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type UseGSuiteServiceContextProviderProps = {
  gsuiteService: GSuiteService;
  setGSuiteService: Dispatch<SetStateAction<GSuiteService>>;
};

export const UseGSuiteServiceProvider = createContext<UseGSuiteServiceContextProviderProps>({
  gsuiteService: GSuiteService.DRIVE,
  setGSuiteService: () => {},
});

export const useGSuiteService = () => {
  const context = useContext(UseGSuiteServiceProvider);
  if (!context) {
    throw new Error(
      "UseGSuiteServiceContext must be used within the UseGSuiteServiceProvider"
    );
  }
  return context;
};
