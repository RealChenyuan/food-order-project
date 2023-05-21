import { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./OrderMessage.module.css";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import CartContext from "../../store/cart-context";

function OrderMessage(props) {
  const cartCtx = useContext(CartContext);
  const { isLoading, error, sendRequest: fetchOrders } = useHttp();

  const {
    value: enteredName,
    isValid: nameIsValid,
    valueHasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    valueHasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: streetReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCode,
    isValid: codeIsValid,
    valueHasError: codeHasError,
    valueChangeHandler: codeChangeHandler,
    inputBlurHandler: codeInputBlurHandler,
    reset: codeReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: cityIsValid,
    valueHasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: cityReset,
  } = useInput((value) => value.trim() !== "");

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(nameIsValid && streetIsValid && codeIsValid && cityIsValid);
  }, [nameIsValid, streetIsValid, codeIsValid, cityIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    nameReset();
    streetReset();
    codeReset();
    cityReset();

    const request = {
      url: "https://react-http-87d82-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        user: {
          name: enteredName,
          street: enteredStreet,
          postalCode: enteredCode,
          city: enteredCity,
        },
        orderedItems: cartCtx.items,
      },
    };

    fetchOrders(request, () => {});

    !isLoading && !error && props.onShowOrderResult();
  };

  const nameClasses = `${classes.input} ${nameHasError ? classes.invalid : ""}`;
  const streetClasses = `${classes.input} ${
    streetHasError ? classes.invalid : ""
  }`;
  const codeClasses = `${classes.input} ${codeHasError ? classes.invalid : ""}`;
  const cityClasses = `${classes.input} ${cityHasError ? classes.invalid : ""}`;

  return (
    <Modal onHideCart={props.onHideOrderMessage}>
      <div className={classes.message}>
        <header className={classes.header}>
          <h2>CheckList</h2>
        </header>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={nameClasses}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameInputBlurHandler}
            />
            {nameHasError && (
              <p className={classes["error-text"]}>
                Your name can not be empty
              </p>
            )}
          </div>
          <div className={streetClasses}>
            <label htmlFor="street">Street</label>
            <input
              type="address"
              id="street"
              value={enteredStreet}
              onChange={streetChangeHandler}
              onBlur={streetInputBlurHandler}
            />
            {streetHasError && (
              <p className={classes["error-text"]}>Street can not be empty</p>
            )}{" "}
          </div>
          <div className={codeClasses}>
            <label htmlFor="code">Postal Code</label>
            <input
              type="code"
              id="code"
              value={enteredCode}
              onChange={codeChangeHandler}
              onBlur={codeInputBlurHandler}
            />
            {codeHasError && (
              <p className={classes["error-text"]}>
                Postal Code can not be empty
              </p>
            )}{" "}
          </div>
          <div className={cityClasses}>
            <label htmlFor="city">City</label>
            <input
              type="address"
              id="city"
              value={enteredCity}
              onChange={cityChangeHandler}
              onBlur={cityInputBlurHandler}
            />
            {cityHasError && (
              <p className={classes["error-text"]}>City can not be empty</p>
            )}{" "}
          </div>
          <button type="submit" disabled={!formIsValid}>
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default OrderMessage;
