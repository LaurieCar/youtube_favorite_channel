import { AppError } from "@/lib/utils/errors";
import { youtubeFetch } from "@/lib/youtube/client";

export type ChannelResult = {
  channelId: string;
  title: string;
  url: string;
  subscriberCount: number;
  recentActivityVerified: boolean;
  recentHitVerified: boolean;
  matchedBy: "channel_name" | "video_titles";
};

type YouTubeSearchResponse = {
  items?: Array<{
    id?: { channelId?: string };
    snippet?: { channelTitle?: string };
  }>;
};

type YouTubeChannelsResponse = {
  items?: Array<{
    id?: string;
    snippet?: { title?: string };
    statistics?: { subscriberCount?: string };
  }>;
};

export async function searchChannelsByCategory(keywords: string[]): Promise<ChannelResult[]> {
  if (keywords.length === 0) {
    return [];
  }

  const searchData = await youtubeFetch<YouTubeSearchResponse>("/search", {
    part: "snippet",
    q: keywords.join(" "),
    type: "channel",
    maxResults: 10,
  });

  const channelIds = Array.from(
    new Set(searchData.items?.map((item) => item.id?.channelId).filter(Boolean) as string[]),
  );

  if (channelIds.length === 0) {
    return [];
  }

  const channelsData = await youtubeFetch<YouTubeChannelsResponse>("/channels", {
    part: "snippet,statistics",
    id: channelIds.join(","),
    maxResults: channelIds.length,
  });

  return (channelsData.items ?? [])
    .map((item) => {
      const subscriberCount = Number(item.statistics?.subscriberCount ?? 0);

      return {
        channelId: item.id ?? "",
        title: item.snippet?.title ?? "Chaîne inconnue",
        url: `https://www.youtube.com/channel/${item.id ?? ""}`,
        subscriberCount,
        recentActivityVerified: false,
        recentHitVerified: false,
        matchedBy: "channel_name" as const,
      };
    })
    .filter((item) => item.channelId)
    .sort((a, b) => b.subscriberCount - a.subscriberCount)
    .slice(0, 5);
}

export function assertEligibleResults(results: ChannelResult[]) {
  if (!results.length) {
    throw new AppError(404, "NO_CHANNEL_FOUND", "Aucune chaîne trouvée. Essayez d'affiner les mots-clés.");
  }

  return results;
}
