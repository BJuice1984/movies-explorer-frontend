import React from "react";
import Promo from '../Promo/Promo';
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import './Main.css';

function Main() {

  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />

    </main>
  )
}
export default Main;