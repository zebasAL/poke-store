import { useState, type FC, ReactElement } from 'react';
import {
  SideSheet, Heading, Pane, Button,
} from 'evergreen-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapState, MapDispatch, ReduxActions, ReduxState } from '../../models';
import { QuantityBar } from "./";

type CartUser = {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}
type State = {
  cart: ReduxState["cart"];
  currency: ReduxState["currency"];
}
type Actions = {
  setCart: ReduxActions["setCart"];
};
const mapStateToProps: MapState<State> = (state) => ({
  cart: state.cart,
  currency: state.currency,
});
const mapDispatchToProps: MapDispatch<Actions> = (dispatch) => ({
  setCart: (values) => dispatch({
    type: 'SET_CART',
    payload: values,
  }),
});
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & CartUser;

const Cart: FC<Props> = ({
  isCartOpen,
  setIsCartOpen,
  cart,
  setCart,
  currency,
}): ReactElement => {

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

  return (
    <SideSheet
      isShown={isCartOpen}
      onCloseComplete={() => setIsCartOpen(false)}
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading display="flex" justifyContent="center" size={600}>Shopping Cart</Heading>
        </Pane>
      </Pane>

      {!cart?.products.length ? 
      <div data-cy="message-no-products" style={{ display: 'table', margin: '50px auto' }}>
        You have not added any product yet
      </div>
      : (
      <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
        <div className="cart-products-container">
          <div className="cart-products-title" style={{ alignItems: "baseline" }}>
            <p>{`Account Founds:`}</p>
            <Button is={Link} to="" boxShadow="box-shadow: 0 0 0 2px #d6e0ff">ADD FOUNDS</Button>
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

          <div className="payment-button">
            <Button appearance="primary" intent="danger" marginTop={10}>Proceed to payment</Button>
          </div>
        </div>
      </Pane>            
      )}
    </SideSheet>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);