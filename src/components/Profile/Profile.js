import React from "react";
import Logo from '../Logo/Logo';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Link } from 'react-router-dom';
import './Profile.css'

function Profile(props) {

  return (
    <section className="profile">
      <Logo />
      <BurgerMenu />
    </section>
  )
}

export default Profile;
