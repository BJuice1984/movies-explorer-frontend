import React from "react";
import './BurgerMenu.css';

function BurgerMenu() {

  return (
    <section className="burger-menu">
      <input type="checkbox" className="toggler"></input>
      <div className="hamburger"><div></div></div>
      {/* <div className="menu">
          <div>
              <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>About</a></li>
                  <li><a href='#'>Services</a></li>
                  <li><a href='#'>Contact</a></li>
              </ul>
          </div>
      </div> */}
    </section>
  )

}

export default BurgerMenu;
