import { API_URL } from "@/app/config";

const BASE_CACHE_KEY = "fcdynamiclayoutcache";

export const LAYOUT_TTL =
  process.env.NODE_ENV === "production"
    ? 1000 * 60 * 30  // 30 min
    : 1000 * 60 * 2;  // 2 min (development)

export const LayoutCache = {
  /**
   * Generates a deterministic unique cache key per view route sequence
   */
  getResolveKey: (main: string | null, sub: string | null) => {
    if (!main) return BASE_CACHE_KEY;
    return `${BASE_CACHE_KEY}_${main}_${sub || "root"}`;
  },

  get: (main: string | null, sub: string | null) => {
    if (typeof window === "undefined" || !main) return null;

    const resolvedKey = LayoutCache.getResolveKey(main, sub);
    const raw = sessionStorage.getItem(resolvedKey);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);

      // Structure and type validation
      if (!parsed?.data || !parsed?.expiry) {
        sessionStorage.removeItem(resolvedKey);
        return null;
      }

      // Evict block if cache threshold expiration is hit
      if (Date.now() > parsed.expiry) {
        sessionStorage.removeItem(resolvedKey);
        return null;
      }

      return parsed.data;
    } catch (err) {
      sessionStorage.removeItem(resolvedKey);
      return null;
    }
  },

  set: (main: string | null, sub: string | null, data: any) => {
    if (typeof window === "undefined" || !main) return;

    const resolvedKey = LayoutCache.getResolveKey(main, sub);
    const payload = {
      data,
      expiry: Date.now() + LAYOUT_TTL,
    };

    sessionStorage.setItem(resolvedKey, JSON.stringify(payload));
  },

  clearAll: () => {
    if (typeof window === "undefined") return;
    
    // Scrape context strings out of session space matching our signature pattern prefix
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith(BASE_CACHE_KEY))
      .forEach((key) => sessionStorage.removeItem(key));
  },
};

/**
 * Connects directly to backend context layout arrays using specific query strings
 * Format targets: /section?main=dashboard OR /section?main=queues&sub=active
 */
export async function fetchContentData(main: string, sub: string | null) {
  try {
    const params = new URLSearchParams();
    params.append("main", main);
    
    if (sub) {
      params.append("sub", sub);
    }

    const url = `${API_URL}/section?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch dynamic layout structural elements: ${res.statusText}`);
    }

    const jsonResponse = await res.json();
    
    // Unpack payload object data envelope safely
    return jsonResponse.data !== undefined ? jsonResponse.data : jsonResponse;
  } catch (err) {
    console.error("Dynamic Layout Engine Fetch Error:", err);
    throw err;
  }
}