import { env } from "@/lib/utils/env";
import { AppError } from "@/lib/utils/errors";

type RequestParams = Record<string, string | number | undefined>;

export async function youtubeFetch<T>(path: string, params: RequestParams) {
  if (!env.YOUTUBE_API_KEY || env.YOUTUBE_API_KEY === "replace-me") {
    throw new AppError(
      503,
      "YOUTUBE_API_KEY_MISSING",
      "La clé YouTube n'est pas configurée pour cette application.",
    );
  }

  const url = new URL(`${env.YOUTUBE_API_BASE_URL}${path}`);
  url.searchParams.set("key", env.YOUTUBE_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new AppError(502, "YOUTUBE_API_ERROR", "Le service YouTube est temporairement indisponible.");
  }

  return (await response.json()) as T;
}
