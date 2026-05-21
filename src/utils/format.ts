export const genderMap: Record<string, string> = {
  m: "Male",
  f: "Female",
  o: "Other",
};
export const formatDOB = (dob: {y: number;m: number;d: number;}): string => {
  const date = new Date(dob.y, dob.m - 1, dob.d);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
export const formatCurrentDate = (pattern: string) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const shortYear = String(year).slice(-2);
  const dayName = now.toLocaleString('default', { weekday: 'long' });
  const monthName = now.toLocaleString('default', { month: 'short' });
  const monthFull = now.toLocaleString('default', { month: 'long' });

  switch (pattern) {
    case "DD/MM/YYYY": return `${day}/${month}/${year}`;
    case "MM/DD/YYYY": return `${month}/${day}/${year}`;
    case "YYYY/MM/DD": return `${year}/${month}/${day}`;
    case "DD.MM.YYYY": return `${day}.${month}.${year}`;
    case "DD-MM-YYYY": return `${day}-${month}-${year}`;
    case "YYYY-MM-DD": return `${year}-${month}-${day}`;
    case "D/M/YY":     return `${now.getDate()}/${now.getMonth() + 1}/${shortYear}`;
    case "M/D/YY":     return `${now.getMonth() + 1}/${now.getDate()}/${shortYear}`;
    case "MMM D, YYYY": return `${monthName} ${now.getDate()}, ${year}`;
    case "D MMM YYYY":  return `${now.getDate()} ${monthName} ${year}`;
    case "MMMM D, YYYY": return `${monthFull} ${now.getDate()}, ${year}`;
    case "dddd, MMM D": return `${dayName}, ${monthName} ${now.getDate()}`;
    default: return now.toLocaleDateString();
  }
};
export const formatKeys = [
  // --- Standard Formats ---
  "DD/MM/YYYY",    // European/India: 16/04/2026
  "MM/DD/YYYY",    // US Standard: 04/16/2026
  "YYYY/MM/DD",    // Technical/ISO: 2026/04/16

  // --- Dotted & Dashed (Common in Europe/CIS) ---
  "DD.MM.YYYY",    // 16.04.2026
  "DD-MM-YYYY",    // 16-04-2026
  "YYYY-MM-DD",    // Database/HTML5: 2026-04-16

  // --- Short Hand ---
  "D/M/YY",        // 16/4/26
  "M/D/YY",        // 4/16/26

  // --- Descriptive (Text-based) ---
  "MMM D, YYYY",   // Apr 16, 2026
  "D MMM YYYY",    // 16 Apr 2026
  "MMMM D, YYYY",  // April 16, 2026
  "dddd, MMM D",   // Thursday, Apr 16
];
export const formatTimeAgo = (date: { y: number; m: number; d: number }) => {
  const now = new Date();
  const created = new Date(date.y, date.m - 1, date.d);
  const diffInMs = now.getTime() - created.getTime();
  
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  if (diffInMonths > 0) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  return "Today";
};

/**
 * Universal Sorter: Pins Primary to top, then sorts by date
 */
export const sortRecentItems = <T extends { isPrimary?: boolean; createdAt: { y: number; m: number; d: number } }>(items: T[]) => {
  return [...items].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    const dateA = new Date(a.createdAt.y, a.createdAt.m - 1, a.createdAt.d).getTime();
    const dateB = new Date(b.createdAt.y, b.createdAt.m - 1, b.createdAt.d).getTime();
    return dateB - dateA;
  });
};

export const themeOptions: Record<string, string> = {
  def: "System Default",
  day: "Light",
  ngt: "Dark"
};

export const visibilityOptions: Record<string, string> = {
  "pub": "Public", 
  "pri": "Private", 
  "org": "Organization", 
  "con": "Connections Only"
};

export const timeOptions: Record<string, string> = {
  "12h": "12-hour (1:00 PM)", 
  "24h": "24-hour (13:00)"
};

export const usageOptions: Record<string, string> = {
  "per": "Personal", 
  "bus": "Business", 
  "dev": "Developer", 
  "oth": "Other"
};

export const languageOptions: Record<string, string> = {
  "eng":"English","spa": "Spanish","frn": "French"
}