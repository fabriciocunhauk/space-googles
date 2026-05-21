/**
 * Wraps a fetch request with a timeout using Promise.race.
 *
 * IMPORTANT: We intentionally do NOT use AbortController here.
 * Passing a custom `signal` to Next.js's extended `fetch()` disables
 * the built-in ISR cache (`next: { revalidate }`), making every call
 * a cold fetch. Promise.race gives us the timeout without touching
 * the signal, so Next.js caching works as expected.
 *
 * @param url      - The URL to fetch
 * @param options  - Standard RequestInit options (including `next: { revalidate }`)
 * @param timeoutMs - Max wait time in milliseconds (default: 8000ms)
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 8000
): Promise<Response> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`Request timed out after ${timeoutMs}ms: ${url}`)),
      timeoutMs
    )
  );

  return Promise.race([fetch(url, options), timeoutPromise]);
}
