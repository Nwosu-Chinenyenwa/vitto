import { getCelebrityNews } from "@/lib/news";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default async function CelebrityPage() {
  const { articles } = await getCelebrityNews();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <div className="bg-black text-yellow-400 py-3 overflow-hidden">
        <div className="animate-marquee inline-block text-sm font-bold uppercase tracking-wider">
          🔥 LAS 10 NOTICIAS MÁS CALIENTES DEL CHISME MEXICANO TODAS AQUÍ, DE
          UNA JALADA 🔥
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {articles.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
              {articles.map((article, index) => (
                <article
                  key={index}
                  className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-80 mb-5 overflow-hidden rounded-3xl shadow-xl bg-black">
                    <img
                      src={article.image || "/placeholder.jpg"}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-6 left-6 bg-[#CC0000] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wide shadow-lg">
                      Exclusiva
                    </div>

                    <div className="absolute bottom-6 left-6 bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                      {article.source.name}
                    </div>
                  </div>

                  <div className="px-2">
                    <h2 className="text-2xl font-extrabold leading-tight text-gray-900 group-hover:text-[#CC0000] transition-colors line-clamp-3 mb-3">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-base line-clamp-3 mb-5">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#CC0000] font-black text-lg hover:text-[#CC0000] transition-colors"
                    >
                      LEER MÁS →
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <a
              className="inline-flex mt-5 hover:underline ml-2 items-center text-[#CC0000] font-black text-lg hover:text-[#CC0000] transition-colors"
              href="https://www.eluniversal.com.mx"
            >
              See all news on El Universal &rarr;
            </a>
          </div>
        ) : (
          <div className="text-center py-32">
            <h2 className="text-3xl font-bold text-gray-400">
              Cargando las 100 noticias más chidas del momento...
            </h2>
            <p className="text-gray-500 mt-4">
              Si no carga, revisa tu API key de GNews o si tu plan permite
              max=100
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
