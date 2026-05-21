const KEY = "fcathomuicache";
export const TTL =
  process.env.NODE_ENV === "production"
    ? 1000 * 60 * 30   // 30 min
    : 1000 * 60 * 2 ; // 2 min (dev) // 30 minutes (adjust as needed)

export const UICCache = {
  get: () => {
    if (typeof window === "undefined") return null;

    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);

      // ❌ Invalid structure
      if (!parsed?.data || !parsed?.expiry) {
        sessionStorage.removeItem(KEY);
        return null;
      }

      // ⏰ Expired
      if (Date.now() > parsed.expiry) {
        sessionStorage.removeItem(KEY);
        return null;
      }

      return parsed.data;
    } catch (err) {
      sessionStorage.removeItem(KEY);
      return null;
    }
  },

  set: (data: any) => {
    if (typeof window === "undefined") return;

    const payload = {
      data,
      expiry: Date.now() + TTL,
    };

    sessionStorage.setItem(KEY, JSON.stringify(payload));
  },

  clear: () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(KEY);
  },
};