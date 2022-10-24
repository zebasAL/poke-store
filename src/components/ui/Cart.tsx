import type { FC, ReactElement } from "react";
import {
  SideSheet, Heading, Pane, Button,
} from "evergreen-ui";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toaster } from "evergreen-ui"
import { MapState, MapDispatch, ReduxActions, ReduxState } from "../../models";
import { QuantityBar } from "./";
import { newFunds } from "../../helpers";

type UserCart = {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}
type State = {
  cart: ReduxState["cart"];
  currency: ReduxState["currency"];
  userFunds: ReduxState["userFunds"];
}
type Actions = {
  setCart: ReduxActions["setCart"];
  setUserFunds: ReduxActions["setUserFunds"];
};
const mapStateToProps: MapState<State> = (state) => ({
  cart: state.cart,
  currency: state.currency,
  userFunds: state.userFunds,
});
const mapDispatchToProps: MapDispatch<Actions> = (dispatch) => ({
  setCart: (values) => dispatch({
    type: "SET_CART",
    payload: values,
  }),
  setUserFunds: (values) => dispatch({
    type: "SET_USER_FUNDS",
    payload: values,
  }),
});
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & UserCart;

const UserCart: FC<Props> = ({
  isCartOpen,
  cart,
  currency,
  userFunds,
  setIsCartOpen,
  setCart,
  setUserFunds,
}): ReactElement => {
  const subTotal = Number((cart?.products.reduce((prev, product) => prev + (product.price * product.quantity * currency.quote), 0) ?? 0.00)?.toFixed(2));
  const taxes = Number((subTotal * .16 * currency.quote).toFixed(2));
  const totalPayment = Number((subTotal + taxes).toFixed(2));
  const remainingFunds = Number(((userFunds.funds * currency.quote) - totalPayment).toFixed(2));

  /**
   * Adds from 5 to 15 dollars to existing account funds
   */
  const handleAddFunds = () => {
    setUserFunds({
      ...userFunds,
      funds: Number(((userFunds?.funds ?? 0) + newFunds).toFixed(2)),
      updatedAt: new Date().toISOString(),
    })
  };

  /**
   * Update quantity of the selected product
   * 
   * @param {number} quantity the new amount that will replace the old
   * @param {number} id product cart id
   */
  const handleUpdateQuantity = (quantity: number, id: number) => {
    if (!cart) return;
    const products = [...cart.products].map((product) => (product.id !== id) ? product : { ...product, quantity });
    setCart({ ...cart, products });
  };

  /**
   * Removes product from cart
   * 
   * @param {number} cartIndex
   */
  const removeProductCart = (id: number) => {
    if (!cart) return;
    const products = [...cart.products].filter((product) => (product.id !== id));
    if (products.length) {
      setCart({ ...cart, products });
    } else {
      setCart(null);
    }
  };

  /**
   * Handles payment
   */
  const handlePayment = () => {
    setUserFunds({
      ...userFunds,
      funds: remainingFunds,
      updatedAt: new Date().toISOString(),
    });
    setCart(null);
    toaster.success("successful purchase", {
      description: "Come back soon",
      id: "forbidden-action",
    })
  };

  return (
    <SideSheet
      isShown={isCartOpen}
      onCloseComplete={() => setIsCartOpen(false)}
      containerProps={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
      }}
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading display="flex" justifyContent="center" size={600}>Shopping Cart</Heading>
        </Pane>
      </Pane>

      {!cart?.products.length ? 
      <div data-cy="message-no-products" style={{ display: "table", margin: "50px auto" }}>
        You have not added any product yet
      </div>
      : (
      <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
        <div className="cart-products-container">
          <div className="cart-products-title" style={{ alignItems: "baseline" }}>
            <p>{`Account Funds: ${currency.symbol + " " + ((userFunds?.funds ?? 0) * currency.quote)}`}</p>
            <Button onClick={handleAddFunds} boxShadow="box-shadow: 0 0 0 2px #d6e0ff">ADD FUNDS</Button>
          </div>
          <div className="cart-products-title">
            <p>{`Products:`}</p>
            <p>{`Created: ${new Date(cart.date).toLocaleDateString()}`}</p>
          </div>

          {cart.products.map((product) => (
            <div className="cart-products-wrapper" key={product.id}>
              <Link to={`/${product.id}`}>
                <img alt="CartProduct" src={product.image} data-cy={`product-cart-image-${product?.id}`} />
              </Link>

              <div className="cart-products-content" data-cy={`product-cart-title-${product?.id}`}>
                <p>{product.title}</p>
                <div className="cart-products-pricing">
                  <div className="quantity-container">
                    <QuantityBar
                      label="Quantity:"
                      quantity={product.quantity}
                      setQuantity={(quantity) => handleUpdateQuantity(quantity, product.id)}
                    />
                  </div>
                  <p>{`Price: ${currency.symbol + " " + ((product?.price ?? 1) * currency.quote).toFixed(2)}`}</p>
                </div>
                <p>{`Total: ${currency.symbol + " " + (product.price * product.quantity * currency.quote).toFixed(2)}`}</p>
                <Button onClick={() => removeProductCart(product.id)}>Delete</Button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <p>{`Subtotal = ${currency.symbol} ${subTotal}`}</p>
            <p>{`Taxes = ${currency.symbol} ${taxes}`}</p>
            <p>{`Total = ${currency.symbol} ${totalPayment}`}</p>
            {remainingFunds <= 0 && (<p style={{ color: "red" }}>Insufficient funds, please add more</p>)}
          </div>
          <div className="payment-button">
            <Button disabled={remainingFunds <= 0} onClick={handlePayment} appearance="primary" intent="danger" marginTop={10}>Proceed to payment</Button>
          </div>
        </div>
      </Pane>            
      )}
    </SideSheet>
  );
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(UserCart);