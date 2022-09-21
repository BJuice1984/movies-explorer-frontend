import React from "react";
import './PageNotFound.css';
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <span className="page-not-found__subtitle">Страница не найдена</span>
      <button onClick={goBack} className="page-not-found__button" type="button">Назад</button>
    </section>
  )
}

export default PageNotFound;
