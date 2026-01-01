import React from "react";

export default function EntertainmentRelatedSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-[14px] font-[400] border-b border-[#dedede] py-4 text-[#555555] mb-6 uppercase tracking-wider">
            NOTICIAS RELACIONADAS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative overflow-hidden">
                <img
                  src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2024/03/5223-alan-walker-putri-ariani-peder-elias-who-i-am-maxresdefault-240x135.jpg"
                  alt="Alan Walker, Putri Ariani, Peder Elias – Who I Am"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-white opacity-90"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-[14px] text-[#000] leading-relaxed">
                Alan Walker, Putri Ariani, Peder Elias – Who I Am
              </p>
            </div>

            <div>
              <img
                src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2017/03/2708-twins-get-famous-for-unusual-hair-they-were-ashamed-of-their-unusual-hair-but-now-theyre-famous-for-it-1489516974-b-768x433.jpg"
                alt="Gemelas se hacen famosas por su cabello inusual"
                className="w-full h-40 object-cover"
              />
              <p className="mt-2 text-[14px] text-[#000] leading-relaxed">
                Gemelas se hacen famosas por su cabello inusual
              </p>
            </div>

            <div>
              <img
                src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2017/01/2387-10-best-special-forces-from-around-the-world-best-special-forces-from-around-the-world-14858783888n4gk-315x170.jpg"
                alt="Las 10 mejores fuerzas especiales del mundo"
                className="w-full h-40 object-cover"
              />
              <p className="mt-2 text-[14px] text-[#000] leading-relaxed">
                Las 10 mejores fuerzas especiales del mundo
              </p>
            </div>

            <div>
              <img
                src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2019/04/4046-just-33-really-pretty-accessories-for-your-spring--tmp-name-2-17712-1554496430-5-dblbig.jpg"
                alt="33 accesorios muy bonitos para tu guardarropa de primavera"
                className="w-full h-40 object-cover"
              />
              <p className="mt-2 text-[14px] text-[#000] leading-relaxed">
                33 accesorios muy bonitos para tu guardarropa de primavera
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-[400] border-b border-[#dedede] py-4 text-[#555555] mb-6 uppercase tracking-wider">
            LO MÁS CALIENTE
          </h2>

          <div>
            <p className="text-lg text-[#888888]">No hay noticias virales por el momento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}