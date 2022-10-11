import React from "react";
import './AboutMe.css';

function AboutMe() {

  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__student-photo" alt='Картинка фото студента'></div>
        <h3 className="about-me__student-name">Ильич</h3>
        <p className="about-me__student-description">Фронтенд-разработчик, 38 лет</p>
        <p className="about-me__student-text">Я из Санкт-Петербурга. Я люблю слушать музыку. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <nav className="about-me__student-links">
          <a className="about-me__student-link" target="_blank" href="https://github.com/BJuice1984" rel="noreferrer">Facebook</a>
          <a className="about-me__student-link" target="_blank" href="https://github.com/BJuice1984" rel="noreferrer">Github</a>
        </nav>
      </div>
    </section>
  )
}

export default AboutMe;