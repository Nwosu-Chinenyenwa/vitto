"use client";

import Image from "next/image";

export default function EntertainmentPage() {
  // Hardcoded data to match your screenshot exactly
  const mainVideo = {
    videoId: "dQw4w9WgXcQ", // Replace with real ID if needed
    title:
      "Alan Walker, Putri Ariani, Peder Elias – Who I Am (Restrung Performance)",
    thumbnail: "/images/who-i-am-thumbnail.jpg", // Place your image here
    author: "Andra Yogi",
    publishedAgo: "3 months ago",
    description:
      'Watch the official music video here. "Who I Am EP" out now 💙',
  };

  const getVideoUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <>
      <main className="mr-10">
        <div className=" py-8">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="relative aspect-video">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${mainVideo.videoId}?autoplay=0&rel=0`}
                  title={mainVideo.title}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="py-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {mainVideo.title}
              </h1>

              {/* Author & Date */}
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white shadow"></div>
                  <span className="font-medium">{mainVideo.author}</span>
                </div>
                <span>•</span>
                <span>{mainVideo.publishedAgo} in Entertainment</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M2 10c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm8-6C6.477 4 4 6.477 4 10s2.477 6 6 6 6-2.477 6-6-2.477-6-6-6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 text-gray-800 text-base leading-relaxed">
                {mainVideo.description}
              </p>

              {/* Watch on YouTube Button */}
              <div className="mt-8">
                <a
                  href={getVideoUrl(mainVideo.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#FF0000] text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex items-center">
              <h2 className="text-[14px] font-[700] text-[#000] uppercase tracking-wider mr-6">
                VOTERS
              </h2>

              <div className="flex -space-x-4">
                <img
                  src="https://secure.gravatar.com/avatar/611d17e0b8ea7ccf41bb77c3ed9b7d15b5d711be40d0dd488618050a2743363d?s=56&d=mm&r=g"
                  alt="Voter"
                  className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                />

                <img
                  src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2023/07/34-upvotedemo-When-youve-been-sitting-in-Chicago-traffic-for-two-hours-and-only-moved-five-feet-150x150.png"
                  alt="Voter"
                  className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                />

                <img
                  src="https://secure.gravatar.com/avatar/168b9741d9b3a122a4735c458d2fa8f32e80c9c5472c7a24d95de5086fe561c1?s=56&d=mm&r=g"
                  alt="Voter"
                  className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                />

                <img
                  src="https://demo2.themewarrior.com/upvote/wp-content/uploads/sites/19/2023/07/34-upvotedemo-When-youve-been-sitting-in-Chicago-traffic-for-two-hours-and-only-moved-five-feet-150x150.png"
                  alt="Voter"
                  className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                />

                <div className="w-8 h-8 rounded-full bg-gray-400 border-4 border-white shadow-md flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="#"
                className="text-red-600 text-[14px] font-[700]  flex items-center hover:underline"
              >
                <span className="text-[14px] font-[700] mr-2">!</span>
                <span>Report Story</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
