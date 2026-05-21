const IS_BROWSER = typeof window !== "undefined";
export const domains: Record<string, string> ={
  main: "fehmicorp.in",
  acc: "accounts.fehmicorp.in",
  def: "central.fehmicorp.in",
};
export const DNS = (code: string = "def") => {
  const isProd = process.env.NODE_ENV === "production";
  const env = isProd ? "prod" : "dev";

  if (isProd) {
    const domain = domains[code] || domains.def;
    return `https://${domain}`;
  }
  if (code !== "def") {
    const domain = domains[code] || domains.def;
    return `https://${domain}`;
  }
  return `/`;
}
interface ConfigPath {
  url: string;
  cdn: string;
  api: string;
}
export const getBasePath = (
  type: keyof ConfigPath = "url",
) => {
  const isProd = process.env.NODE_ENV === "production";
  const env = isProd ? "prod" : "dev";
  const basePath: Record<"prod" | "dev", ConfigPath> = {
    prod: {
      url: "/mailer",
      cdn: "/cdn/mailer",
      api: "/api/mailer",
    },
    dev: {
      url: "/",
      cdn: "/",
      api: "/api/",
    },
  };
  return basePath[env][type];
}

export const asset = (path: string) => {
  const domain = DNS();
  const base = getBasePath("cdn");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${domain}${base}${cleanPath}`.replace(/\/+/g, '/').replace("https:/", "https://");
};

export const api = (path: string) => {
  const domain = DNS();
  const base = getBasePath("api");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${domain}${base}${cleanPath}`.replace(/\/+/g, '/').replace("https:/", "https://");
};

/**
 * 🌐 Query param getter
 */
export const getQueryParam = (key: string): string | null => {
  if (!IS_BROWSER) return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

/**
 * 🌐 Query builder
 */
export const buildQuery = (params: Record<string, any>) => {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      q.append(k, String(v));
    }
  });

  return q.toString();
};