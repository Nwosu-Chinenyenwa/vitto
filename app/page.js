"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import image from "../public/logo1.png";

export default function Home() {
  const [loading, setloader] = useState(false);
  useEffect(() => {
    const load = setTimeout(() => {
      {
        setloader(true);
       window.location.pathname = ("Entertainment")
      }
    }, 2000);

    return () => clearTimeout(load);
  }, []);
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[100vh] w-[100vw]">
      <Image src={image} alt="Logo" />
      <div className="w-[200px] h-1  rounded-full bg-black/20 overflow-hidden">
        <div className="h-full w-full animate-loader  bg-[#CC0000] animate-pulse" />
      </div>
    </div>
  );
}
