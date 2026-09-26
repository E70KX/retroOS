export function safeReturnTo() {
  const raw = new URLSearchParams(window.location.search).get(
    "returnTo"
  );

  if (!raw) return "/";

  let url;

  try {
    url = new URL(raw, window.location.origin);
  } catch {
    return "/";
  }

  if (url.origin !== window.location.origin) {
    return "/";
  }

  const blockedParams = [
    "access_token",
    "clear_access_token",
    "app_id",
    "app_base_url",
    "functions_version",
    "from_url",
  ];

  blockedParams.forEach((param) => {
    url.searchParams.delete(param);
  });

  const path = `${url.pathname}${url.search}`;

  if (!path.startsWith("/")) return "/";
  if (path.startsWith("//")) return "/";
  if (path.includes("\\")) return "/";

  return path;
}
