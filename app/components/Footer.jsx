import React from "react";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { TbMail } from "react-icons/tb"; // Cambié FaMailchimp por un ícono más común de email
import { GiWorld } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] py-15 text-[#575757] text-center mt-10">
      <div className="flex items-center flex-col justify-center text-center">
        <ul className="flex gap-5">
          <li>Acerca de</li>
          <li>Política de Privacidad</li>
          <li>Contacto</li>
        </ul>
        <ul className="py-8 flex items-center gap-3">
          <li><FaFacebookF /></li>
          <li><FaWhatsapp /></li>
          <li><FaInstagram /></li>
          <li><GiWorld /></li>
          <li><FaLinkedinIn /></li>
          <li><FaPinterest /></li>
          <li><TbMail /></li> 
        </ul>
        <p className="text-[14px]">
          Copyright UpVote 2026. Todos los derechos reservados
        </p>
        <p className="text-[14px]">
          Diseñado por <span className="text-black">Themewarrior</span>
        </p>
      </div>
    </footer>
  );
}