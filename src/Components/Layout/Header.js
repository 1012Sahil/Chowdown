import React from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
// we can import images in react from their location!
import mealsImage from '../../assets/meals.jpg';

const Header = props => {
    // props come from App.js
    return (
        <React.Fragment>
        <header className={classes.header}>
            <h1>Chow Down</h1>
            <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
        </React.Fragment>
    )
};

export default Header;