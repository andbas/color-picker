"use client";

import { useConsent } from "@/hooks/use-consent";
import Script from "next/script";

export default function Analytics() {
  const { allCookiesAccepted } = useConsent();
  const gaTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <>
      {allCookiesAccepted && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gaTrackingId}', {
          page_path: window.location.pathname,
        });        
      `}
          </Script>
        </>
      )}
    </>
  );
}
