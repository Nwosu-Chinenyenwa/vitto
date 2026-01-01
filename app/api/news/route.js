// api/news/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) return NextResponse.json([], { status: 500 });

    const url =
      `https://newsapi.org/v2/top-headlines?` +
      `q=(celebridades%20OR%20musicos%20OR%20actores%20OR%20futbol)%20-gobierno%20-politica&` +
      `country=mx&` +
      `language=es&` +
      `pageSize=20&` +
      `apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    let articles = (data.articles || []).filter(
      (a) => a.urlToImage && a.description
    );

    // Add slug to each article
    articles = articles.map((a) => ({
      ...a,
      slug: a.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/-+/g, '-')
        .trim(),
    }));

    return NextResponse.json(articles);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}