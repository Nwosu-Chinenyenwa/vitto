import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  // Mejor query para farándula y celebridades SOLO de México
  const url = `https://www.googleapis.com/youtube/v3/search?` +
    `part=snippet&` +
    `q=far%C3%A1ndula+mexicana+OR+celebridades+mexicanas+OR+chisme+celebridades+m%C3%A9xico+OR+entrevistas+actores+mexicanos+OR+m%C3%BAsica+regional+mexicana&` +
    `type=video&` +
    `videoEmbeddable=true&` +          // Solo videos que se pueden embed
    `regionCode=MX&` +
    `relevanceLanguage=es&` +
    `order=date&` +                     // Más recientes primero
    `safeSearch=moderate&` +
    `maxResults=30&` +                 // Trae 30 para tener variedad
    `key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json([]);
    }

    // Filtra solo videos reales y devuelve solo lo necesario
    const videos = data.items
      .filter(item => item.id.kind === "youtube#video")
      .map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description || "Video de farándula mexicana 🔥",
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      }));

    return NextResponse.json(videos);
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json([]);
  }
}