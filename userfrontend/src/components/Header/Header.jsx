import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-box">
        <div className="header-contents">
          <div className="header-text">
            <h2>Craving something Delicious? We’ve got you covered</h2>
            <p>
              From mouthwatering meals to irresistible flavors, we bring your favorite dishes right to your doorstep.
              Explore a menu crafted to excite your taste buds — because every meal should feel like a treat.
            </p>
            <button>Browse Menu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

