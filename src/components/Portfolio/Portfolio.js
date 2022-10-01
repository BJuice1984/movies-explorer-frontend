import React from "react";
import './Portfolio.css';

function Portfolio() {

  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__links">
          <a className="portfolio__link" target="_blank" href="https://github.com/BJuice1984/how-to-learn" rel="noreferrer">Статичный сайт
          <div className="portfolio__arrow">↗</div>
          </a>
          <a className="portfolio__link" target="_blank" href="https://BJuice1984.github.io/russian-travel/" rel="noreferrer">Адаптивный сайт
            <div className="portfolio__arrow">↗</div>
          </a>
          <a className="portfolio__link" target="_blank" href="https://bjuice1984.github.io/react-mesto-auth/" rel="noreferrer">Одностраничное приложение
            <div className="portfolio__arrow">↗</div>
          </a>
        </nav>
    </section>
  )
}

export default Portfolio;