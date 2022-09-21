import React from "react";
import './BurgerMenu.css';

function BurgerMenu() {

  return (
    <body>
    <input type="checkbox" class="toggler"></input>
    <div className="hamburger"><div></div></div>
    <div className="menu">
        <div>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Services</a></li>
                <li><a href='#'>Contact</a></li>
            </ul>
        </div>
    </div>
</body>
  )

}

export default BurgerMenu;
