import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/card-context";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // this is managed by the closest Provider present in App.js
  /* By using context here, the header cart button will be reevaluated by react whenever the context changes. */
  const cartCtx = useContext(CartContext);
  // We want to add all the items and also keep in mind the amount of each item in cart!
  // See reduce fn documentation
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  // We need to pass only the items object as a dependency and not the cardCtx itself, so we pull it out
  const { items } = cartCtx;
  // props come from Header.js
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    // we need to remove the bump class so that when context changes, we can apply it again to display animation
    // else, the class is ever removed and animation can't retrigger after adding the first item
    // We will also add a cleanup function in case that component is removed, which can't happen in this application!
    // But if we add items rapidly, we need a new animation, for which we require the cleanup function!
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300); // 300 ms is the time the animation plays for!

    return () => {
      clearTimeout(timer);
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
