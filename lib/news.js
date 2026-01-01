export async function getCelebrityNews() {
  const apiKey = process.env.GNEWS_API_KEY;
  const pageSize = 100; // Máximo permitido en planes pagos de GNews

  const url = `https://gnews.io/api/v4/search?q=(famosos OR celebridades OR espectáculos OR farándula OR chisme OR estrella OR actor OR actriz OR cantante OR belinda OR angelina OR piqué)&lang=es&country=mx&max=${pageSize}&apikey=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 } // Recarga cada 5 minutos
    });

    if (!res.ok) throw new Error('API error');

    const data = await res.json();

    const articles = (data.articles || []).map(article => ({
      ...article,
      image: article.image || 'https://via.placeholder.com/800x600.png?text=Sin+Imagen',
      description: article.description || 'Sin descripción disponible.',
    }));

    return {
      articles, // Solo devolvemos las 100 noticias
    };
  } catch (error) {
    console.error("News fetch error:", error);
    return {
      articles: [],
    };
  }
}