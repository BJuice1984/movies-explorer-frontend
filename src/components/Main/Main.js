import React from "react";
import Promo from '../Promo/Promo';
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Main.css';

function Main({ isLoggedin }) {

  return (
    <main className="main">
      <Header
        onLoggedin={isLoggedin}/>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  )
}
export default Main;