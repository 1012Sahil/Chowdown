import classes from "./Checkout.module.css";
import { useState, useRef } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotSixChars = (value) => value.trim().length !== 6;
const Checkout = (props) => {
  const [formInputsValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    pincode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pincodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    // we are using refs here to make our work easier
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPincode = pincodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPincodeIsValid = !isNotSixChars(enteredPincode);

    setFormValidity({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      pincode: enteredPincode,
    });
    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPincodeIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data here
    // props come from Cart.js
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      pincode: enteredPincode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a street name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.pincode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pincodeInputRef} />
        {!formInputsValidity.pincode && (
          <p>Pincode must be 6 characters long!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>City name can't be left blank!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;