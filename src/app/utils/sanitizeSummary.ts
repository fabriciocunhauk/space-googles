export function sanitizeSummary(raw: string | null | undefined): string {
  if (!raw) return "";
  let text = raw.replace(/\r?\n/g, " ");
  text = text.replace(/\s*The post .+? appeared first on .+?\.\s*$/i, "");
  return text.replace(/\s{2,}/g, " ").trim();
}
