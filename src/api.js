const API_BASE = "http://localhost:5000";

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // مهم للسشن
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg = data?.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
