"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface ConsentContextType {
  consent: Consent;
  consentDialogOpen: boolean;
  setConsentDialogOpen: (consentDialogOpen: boolean) => void;
  setConsent: (consent: Exclude<Consent, undefined>) => void;
  allCookiesAccepted: boolean;
}

export type Consent =
  | "all-cookies-accepted"
  | "reject-non-essential-cookies"
  | undefined;

const ConsentContext = createContext<ConsentContextType | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(undefined);
  const [consentDialogOpen, setConsentDialogOpen] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookies-consent");
    if (consent) {
      setConsentDialogOpen(false);
      setConsent(consent as Consent);
    }
  }, [consent]);

  const handleConsent = (consent: Exclude<Consent, undefined>) => {
    if (!consent) return;
    setConsent(consent);
    setConsentDialogOpen(false);
    localStorage.setItem("cookies-consent", consent);
  };

  const value = {
    consent,
    consentDialogOpen,
    setConsentDialogOpen,
    setConsent: handleConsent,
    allCookiesAccepted: consent === "all-cookies-accepted",
  };

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
