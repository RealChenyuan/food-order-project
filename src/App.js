import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderMessage from "./components/Cart/OrderMessage";
import Card from "./components/UI/Card";
import OrderResult from "./components/Cart/OrderResult";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderMessageIsShown, setOrderMessageIsShown] = useState(false);
  const [orderResultIsShown, setOrderResultIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showOrderMessageHandler = () => {
    setCartIsShown(false);
    setOrderMessageIsShown(true);
  };

  const hideOrderMessageHandler = () => {
    setOrderMessageIsShown(false);
  };

  const showOrderResult = () => {
    setOrderMessageIsShown(false);
    setOrderResultIsShown(true);
  };

  const closeOrderResult = (cartContext) => {
    setOrderResultIsShown(false);
    cartContext.clearItems();
  };

  return (
    <CartProvider>
      {orderMessageIsShown && (
        <OrderMessage
          onHideOrderMessage={hideOrderMessageHandler}
          onShowOrderResult={showOrderResult}
        />
      )}
      {cartIsShown && (
        <Cart
          onHideCart={hideCartHandler}
          onShowOrderMessage={showOrderMessageHandler}
        />
      )}
      {orderResultIsShown && <OrderResult onHideResult={closeOrderResult} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
