import React from "react";
import './AboutProject.css';

function AboutProject() {

  return (
    <section className="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__container">
          <ul className="about-project__list">
            <li className="about-project__items">
              <p className="about-project__item">Дипломный проект включал 5 этапов</p>
              <span className="about-project__span-accent">Составление плана, работу над&nbsp;бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</span>
            </li>
          </ul>
          <ul className="about-project__list">
            <li className="about-project__items">
              <p className="about-project__item">На выполнение диплома ушло 5 недель</p>
              <span className="about-project__span-accent">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы&nbsp;успешно защититься.</span>
            </li>
          </ul>
      </div>
      <article className="about-project__plan">
        <p className="about-project__time">1 неделя</p>
        <p className="about-project__time">4 недели</p>
        <span className="about-project__time-description">Back-end</span>
        <span className="about-project__time-description">Front-end</span>
      </article>
    </section>
  )
}

export default AboutProject;
