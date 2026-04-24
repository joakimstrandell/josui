export function connectLiveReload(onChange: () => void): () => void {
  const source = new EventSource("/events");

  source.addEventListener("change", () => {
    reloadStylesheet();
    onChange();
  });

  source.onerror = () => {
    // Let the browser auto-retry; no-op here
  };

  return () => source.close();
}

function reloadStylesheet(): void {
  const link = document.getElementById("tp-user-tokens") as HTMLLinkElement | null;
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  url.searchParams.set("t", String(Date.now()));
  link.href = url.toString();
}
