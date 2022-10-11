import React from "react";
import './Footer.css';

function Footer() {

  return(
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm</h2>
      <nav className="footer__links">
        <a className="footer__link" target="_blank" href="https://practicum.yandex.ru" rel="noreferrer">Яндекс.Практикум</a>
        <a className="footer__link" target="_blank" href="https://github.com/BJuice1984" rel="noreferrer">Github</a>
        <a className="footer__link" target="_blank" href="https://github.com/BJuice1984" rel="noreferrer">Facebook</a>
      </nav>
      <p className="footer__copyright">&#169;2022</p>
    </footer>
  )
}

export default Footer;