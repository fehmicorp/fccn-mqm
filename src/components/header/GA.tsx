import Script from 'next/script';
import { GA_TRACKING_ID } from "@/app/config";

export default function GAHeader() {  
  return (
    <>
      {/* 1. Theme Strategy: beforeInteractive handles the dark mode flash */}
      <Script id="theme-strategy" strategy="beforeInteractive">
        {`
          (function() {
            const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            document.documentElement.setAttribute('data-theme', theme);
          })();
        `}
      </Script>

      {/* 2. Google Analytics: Using afterInteractive */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}