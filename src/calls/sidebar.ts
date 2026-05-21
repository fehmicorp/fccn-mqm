import { transformSidebar } from "@/components/sidebar/transformer";
import { UICCache } from "@/components/sidebar/lib/cache";
import { API_URL } from "@/app/config";

// This is now a pure async function with no hooks
export async function fetchData() {
  try {
    const res = await fetch(`${API_URL}/calls`);
    if (!res.ok) throw new Error("Network response was not ok");
    
    const raw = await res.json();
    const transformed = transformSidebar(raw.data.sidebar);
    if (!transformed) throw new Error("Invalid data");
    const payload = {
      sidebar: { 
        data: transformed.data, 
        ui: raw.data.sidebar.ui || {}, 
      },
      header: { 
        data: raw.data.header.data || {}, 
        ui: raw.data.header.ui || {}, 
      }, 
    };
    // UICCache.set(payload);
    return payload;
  } catch (err) {
    console.error("Sidebar Fetch Error:", err);
    throw err;
  }
}

export async function fetchContent(page?: string, section?: string | boolean) {
  try {
    let url = `${API_URL}/data`;
    if (page) {
      const value = section !== undefined ? section : true;
      url += `?${page}=${value}`;
    }
    const res = await fetch(url);
    if (!res.ok) {throw new Error(`Failed to fetch data: ${res.statusText}`)}
    const data = await res.json();
    return data;
  } catch (err) {
    throw(err)
  }
}