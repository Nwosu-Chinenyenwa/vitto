import React from "react";
import { FaFacebookF,FaWhatsapp,FaInstagram,FaLinkedinIn,FaPinterest,FaMailchimp } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] py-15 text-[#575757] text-center mt-10">
      <div className="flex items-center flex-col justify-center text-center">
        <ul className="flex gap-5">
          <li>About</li>
          <li>Privacy policy</li>
          <li>Contact</li>
        </ul>
        <ul className="py-8 flex items-center gap-3">
            <li><FaFacebookF /></li>
            <li><FaWhatsapp/></li>
            <li><FaInstagram/></li>
            <li><GiWorld  /></li>
            <li><FaLinkedinIn /></li>
            <li><FaPinterest /></li>
            <li><FaMailchimp /></li>
        </ul>
        <p className="text-[14px]">
          Copyright UpVote 2025. All Rights Reserved
        </p>
        <p className="text-[14px]">
          Designed by <span className="text-black">Themewarrior</span>{" "}
        </p>
      </div>
    </footer>
  );
}
