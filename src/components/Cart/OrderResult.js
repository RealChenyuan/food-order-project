import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./OrderResult.module.css";
import CartContext from "../../store/cart-context";

function OrderResult(props) {
  const cartCtx = useContext(CartContext);

  const detail = cartCtx.items
    .map((item) => {
      return `${item.amount} ${item.name}`;
    })
    .join(", ");

  return (
    <Modal onHideCart={props.onHideResult.bind(null, cartCtx)}>
      <div className={classes.result}>
        <h2>
          You have Successfully ordered {detail}, cost $
          {cartCtx.totalAmount.toFixed(2)} in total.
        </h2>
        <button onClick={props.onHideResult.bind(null, cartCtx)}>Close</button>
      </div>
    </Modal>
  );
}

export default OrderResult;
