export const fetchYT = async (videoIds = []) => {
  if (videoIds.length === 0) return [];

  const apiKey = import.meta.env.VITE_API_KEY;
  const idsParam = videoIds.join(",");
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails,statistics&id=${idsParam}&key=${apiKey}`
  );

  const data = await res.json();
  if (!data.items || data.items.length === 0) return [];
  return data.items.map((video) => ({
    id: video.id,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    viewers: video.liveStreamingDetails?.concurrentViewers || 0,
    likes: video.statistics?.likeCount || 0,
    thumbnail: video.snippet.thumbnails.high?.url ||
           video.snippet.thumbnails.medium?.url ||
           video.snippet.thumbnails.default?.url,
  }));
};
