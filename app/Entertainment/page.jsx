"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EntertainmentRelatedSection from "../components/EntertainmentRelatedSection";
import EntertainmentPage from "../components/EntertainmentPage";

export default function page() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);

  const tag = [
    { name: "Alan Walker" },
    { name: " música " },
    { name: "Peder Elias" },
    { name: "Putri Ariani" },
  ];

  useEffect(() => {
    async function fetchData() {
      const newsRes = await fetch("/api/news");
      const newsData = await newsRes.json();
      setArticles(newsData);

      const videosRes = await fetch("/api/videos");
      const videosData = await videosRes.json();
      setVideos(videosData);
    }
    fetchData();
  }, []);

  const mainVideo = videos[0];
  const popularStories = articles.slice(0, 6);
  const relatedStories = articles.slice(6, 9);
  const trendingStories = articles.slice(9, 12);

  return (
    <>
      <Header id="top" />

      <main className="w-[100vw] md:w-[90vw]  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 1 column on mobile, 4 columns (3+1 sidebar) on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 py-6">
          {/* Main Content - Full width on mobile */}
          <div className="md:col-span-3">
            <EntertainmentPage />
          </div>

          {/* Sidebar - Full width on mobile, sticks to side on md+ */}
          <aside className="md:col-span-1 space-y-10">
            {/* Story Categories */}
            <div>
              <h2 className="text-[14px] font-[400] border-b border-[#dedede] py-2 text-[#555555] mb-6 uppercase tracking-wider">
                Categorías
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gray-600 text-sm font-semibold">1</span>
                  </div>
                  <span className="text-[14px] text-[#000] font-medium">Farándula</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gray-600 text-sm font-semibold">2</span>
                  </div>
                  <span className="text-[14px] text-[#000] font-medium">Política</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gray-600 text-sm font-semibold">3</span>
                  </div>
                  <span className="text-[14px] text-[#000] font-medium">Deportes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gray-600 text-sm font-semibold">4</span>
                  </div>
                  <span className="text-[14px] text-[#000] font-medium">Tecnología</span>
                </li>
              </ul>
            </div>

            {/* Popular Stories */}
            <div>
              <h2 className="text-[14px] font-[400] border-b border-[#dedede] py-2 text-[#555555] mb-6 uppercase tracking-wider">
                Historias Más Populares
              </h2>

              <div className="space-y-6">
                {/* Story 1 */}
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2019/07/4151-kawhi-leonard-paul-george-choose-not-to-join-but-t-kawhi-pg-150x150.jpg"
                      alt="Kawhi Leonard, Paul George"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#000] leading-tight">
                      Kawhi Leonard, Paul George eligen no unirse sino...
                    </p>
                    <p className="text-sm text-[#aaa] mt-1 italic">youtube.com</p>
                  </div>
                </div>

                {/* Repeated stories - same structure */}
                <div className="flex items-start space-x-4">
                  <img
                    src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2017/12/3836-ethereum-ripple-and-litecoin-have-arrived-on-bloom-shutterstock-221490373-150x150.jpg"
                    alt="Ethereum, Ripple And Litecoin"
                    className="w-20 h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-[14px] text-[#000] leading-tight">
                      Ethereum, Ripple y Litecoin llegan a los terminales Bloomberg
                    </p>
                    <p className="text-sm text-[#aaa] mt-1 italic">coindesk.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <img
                    src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2019/06/4137-5-must-read-money-books-for-future-millionaires-ph-5-must-read-money-books-for-future-millionaires-depositphotos-73940447-l-2015-150x150.png"
                    alt="5 Must Read Money Books"
                    className="w-20 h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-[14px] text-[#000] leading-tight">
                      5 libros de dinero que todo futuro millonario debe leer
                    </p>
                    <p className="text-sm text-[#aaa] mt-1 italic">phroogal.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2023/07/the-olivier-giroud-shooting-drill-which-sums-up-his-entire-mirror-co-uk-240x135.jpg"
                      alt="The Olivier Giroud shooting drill"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#000] leading-tight">
                      El ejercicio de tiro de Olivier Giroud que resume toda su carrera...
                    </p>
                    <p className="text-sm text-[#aaa] mt-1 italic">mirror.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2024/03/5223-alan-walker-putri-ariani-peder-elias-who-i-am-maxresdefault-240x135.jpg"
                      alt="Alan Walker, Putri Ariani, Peder Elias – Who I Am"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#000] leading-tight">
                      Alan Walker, Putri Ariani, Peder Elias – Who I Am
                    </p>
                    <p className="text-sm text-[#aaa] mt-1 italic">youtube.com</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Section - Full width */}
        <EntertainmentRelatedSection />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 py-8">
          <span className="text-[#656565] text-[14px] font-medium">Etiquetas:</span>
          <ul className="flex flex-wrap gap-2">
            {tag.map((item, index) => (
              <li
                key={index}
                className="text-[#656565] bg-[#eee] text-[12px] py-[5px] px-[10px] rounded-full"
              >
                {item.name.trim()}
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Section - Responsive width */}
        <div className="md:w-[70vw] w-full">
          <div className="w-full border-b border-[#e9ebee] flex flex-col sm:flex-row sm:justify-between text-[14px] pb-4 mb-6">
            <div className="mb-4 sm:mb-0">
              <span className="text-[#1c1e21] font-[600]">0 comentarios</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Ordenar por</span>
              <select className="font-[500] border border-gray-300 rounded px-2 py-1">
                <option>Más recientes</option>
                <option>Más antiguos</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <textarea
              className="outline-none w-full border border-[#e9ebee] p-3 rounded"
              placeholder="Escribe un comentario"
              rows="4"
            ></textarea>
            <div className="w-full bg-[#f5f6f7] p-1 text-right border border-[#d3d6db] rounded-b">
              <button className="bg-[#9cb4d8] hover:bg-[#4267b2] transition-colors cursor-pointer text-[14px] text-white font-bold px-4 py-1 rounded">
                Publicar
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[#555555] text-[14px] font-[400] uppercase mb-4 border-b pb-2 border-[#dedede]">
              Deja tu Comentario
            </h3>
            <p className="text-[#888888] text-[15px] font-[400]">
              Debes estar <span className="text-black font-medium">registrado</span> para comentar.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}