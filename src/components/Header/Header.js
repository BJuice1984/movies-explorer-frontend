import React from "react";
import Logo from "../Logo/Logo";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ onLoggedin }) {
  const [ isMainPage, setIsMainPage ] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      setIsMainPage(true);
    } else {
      setIsMainPage(false);
    }
  }, [location]);

  return (
    <header className={`header ${isMainPage ? 'header_type_main' : ''}`}>
      <BurgerMenu
        onMainPage={isMainPage}
        onLoggedin={onLoggedin}/>
      {isMainPage ? ( 
        <div className="header__container">
          <Logo />
          {onLoggedin ? (
            <>
              <nav className={`header__links ${onLoggedin ? 'header__links_type_loggedin' : ''}`}>
                <Link to='/movies' className="header__film-button">Фильмы</Link>
                <Link to='/saved-movies' className="header__film-button">Сохраненные фильмы</Link>
              </nav>
              <button className="header__btn">
                <Link to='/profile' className="header__account-button">Аккаунт</Link>
              </button>
            </>
          ) : (
            <>
              <Link className='header__reg-button header__reg-button_type_visible' to="/sign-up">Регистрация</Link>
              <Link className='header__entrance-button header__entrance-button_type_visible' to="/sign-in">Войти</Link>
            </>
          )}
        </div>
      ) : (
        <div className="header__container">
          <Logo />
          <nav className="header__links">
            <NavLink to='/movies' className={({ isActive }) => isActive ? 'header__film-button header__film-button_type_active' : 'header__film-button'}>Фильмы</NavLink>
            <NavLink to='/saved-movies' className={({ isActive }) => isActive ? 'header__film-button header__film-button_type_active' : 'header__film-button'}>Сохраненные фильмы</NavLink>
          </nav>
          <button className={`header__btn ${(location.pathname === '/profile') ? 'header__btn_type_active' : ''}`}>
            <Link to='/profile' className="header__account-button">Аккаунт</Link>
          </button>
        </div>
      )}
    </header>
  )
}

export default Header;
