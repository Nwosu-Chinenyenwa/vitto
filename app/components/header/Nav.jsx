"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/logo1.png";
import banner from "../../../public/ad-960x90.jpg";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { LiaLessThanSolid, LiaGreaterThanSolid } from "react-icons/lia";
import AuthModal from "../Auth";
import Link from "next/link";

export default function Nav() {
  const [auth, setAuth] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    }

    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="w-full">
        <div className="bg-[#01579b] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between md:justify-around">
              <div className="flex items-center gap-6 lg:gap-10">
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={120}
                    height={50}
                    className="h-10 w-auto lg:h-12"
                  />
                </Link>

                <ul className="hidden lg:flex items-center gap-8 uppercase text-sm font-medium">
                  <li>
                    <Link
                      href="/Entertainment"
                      className="hover:text-[#001F3F] transition-colors"
                    >
                      Entertainment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/News"
                      className="hover:text-[#001F3F] transition-colors"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-[#001F3F] transition-colors"
                    >
                      Vote
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                 <h2
              onClick={() => setAuth(true)}
              className="text-[18px] text-white cursor-pointer font-[400] border-r border-white py-3 px-5"
            >
              Login
            </h2>

                <button
                  onClick={() => setSearch(!search)}
                  className="p-2 hover:opacity-80 transition"
                  aria-label="Toggle search"
                >
                  <FaSearch className="text-lg lg:text-xl" />
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 hover:opacity-80 transition"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? (
                    <FaTimes className="text-xl" />
                  ) : (
                    <FaBars className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/20">
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/Entertainment"
                  className="block uppercase text-sm font-medium hover:text-[#001F3F] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Entertainment
                </Link>
                <Link
                  href="/News"
                  className="block uppercase text-sm font-medium hover:text-[#001F3F] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
                <Link
                  href="/Voting"
                  className="block uppercase text-sm font-medium hover:text-[#001F3F] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vote
                </Link>
                <button
                  onClick={() => {
                    setAuth(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-normal hover:opacity-80"
                >
                  Login
                </button>
              </div>
            </div>
          )}

          <div
            className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-40 ${
              search ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div ref={searchRef} className="max-w-7xl mx-auto px-4 py-6">
              <input
                autoFocus
                type="text"
                placeholder="Type and hit enter"
                className="w-full bg-[#f9f9f9] px-6 py-5 text-base placeholder:text-sm placeholder:font-medium outline-none"
              />
            </div>
          </div>
        </div>

        <div className="shadow-sm flex justify-around items-center">
          <ul className="flex justify-around items-center">
            <li className="text-[#01579b] text-[12px] font-[600] uppercase w-[120px]">
              Trending Now
            </li>
            <li className="px-[10px] flex items-center py-3 mx-auto border-x border-[#dedede] text-center">
              <span className="text-[16px] text-[#c2c2c2]">
                <LiaLessThanSolid />
              </span>
              <span className="text-[16px] text-[#c2c2c2]">
                <LiaGreaterThanSolid />
              </span>
            </li>
            <li>
              <h3 className="font-[500] px-8 text-[14px]">
                Sorry, no trending stories at the moment
              </h3>
            </li>
          </ul>
          <div></div>
        </div>
          <div className="flex items-center justify-center px-5 py-5 md:px-0 md:pt-15 md:pb-10 cursor-not-allowed">
            <Image src={banner} alt="banner" />
        </div>
      </nav>

      {auth && <AuthModal onClose={() => setAuth(false)} />}
    </>
  );
}
