import { asset, DNS, getBasePath } from '@/lib/url';

export const GA_TRACKING_ID = 'G-J9CK0VM1C7';
export const company_details = {
    name: "Fehmi Corporation",
    short_name: "Fehmi Corp",
    preffix: "Fehmi",
}
export const short_name = `${company_details.preffix} UMS`;
export const  long_name = `${company_details.name} Unified Messaging Service`;
export const title = `${short_name}`;
export const description = `${short_name} is an enterprise-grade omni-channel transaction queue engine built with Next.js and Tailwind CSS. Seamlessly manage, build, and audit high-throughput outgoing Email, SMS, and WhatsApp communications from a single interface.`;
export const favicon = asset("fav.ico");
export const Logo_image = asset("logo/icon_192.png");
export const APP_Domain = DNS("def");
export const API_URL = getBasePath("api");
export const BASE_URL = getBasePath();
export const manifest = "/manifest.app";
export const manifestAPI = {
  name: "Fehmi UMS",
  short_name: "Fehmi UMS",
  description: description,
  start_url: `${process.env.NODE_ENV === "production" ? "/mailer" : "/"}`,
  scope: `${process.env.NODE_ENV === "production" ? "/mailer" : "/"}`,
  display: "standalone",
  orientation: "portrait",
  background_color: "#2B2B2B",
  theme_color: "#0D47A1",
  icons: [
    {
      src: asset("logo/icon_16.png"),
      sizes: "16x16",
      type: "image/png"
    },
    {
      src: asset("logo/icon_32.png"),
      sizes: "32x32",
      type: "image/png"
    },
    {
      src: asset("logo/icon_192.png"),
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: asset("logo/icon_365.png"),
      sizes: "365x365",
      type: "image/png"
    },
    {
      src: asset("logo/icon_512.png"),
      sizes: "512x512",
      type: "image/png"
    }
  ]
};