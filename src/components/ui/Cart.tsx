import { useState, type FC, ReactElement } from 'react';
import axios from 'axios';
import {
  SideSheet, Heading, Pane, Button, Icon, ShoppingCartIcon, Spinner, toaster, Pill,
} from 'evergreen-ui';
import { connect, ConnectedComponent } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapDispatch, ReduxActions, ReduxState, Dispatch } from '../../models';
import { QuantityBar } from "./";

type CartUser = {
  cart: ReduxState["cart"];
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}

type Actions = {
  setCart: ReduxActions["setCart"];
};

const mapDispatchToProps: MapDispatch<Actions> = (dispatch) => ({
  setCart: (values) => dispatch({
    type: 'SET_CART',
    payload: values,
  }),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>
type Props = DispatchProps & CartUser;

const Cart: FC<Props> = ({
  isCartOpen,
  setIsCartOpen,
  cart,
  setCart,
}): ReactElement => {
  const [disabled, setDisabled] = useState<boolean>(false);

  /**
   * handleUpdateQuantity
   * @param {number} cartIndex
   * @param {number} productIndex
   * @param {string} value
   */
  const handleUpdateQuantity = (productIndex: number, value: number) => {
    const {...updatedCarts} = cart;
    updatedCarts.products[productIndex].quantity = value;
    setCart(updatedCarts);
  };

  /**
   * removeProductCart
   * @param {number} cartIndex
   * @param {number} productId
   * @returns {void}
   */
  const removeProductCart = (productId: number) => {
    setDisabled(true);

    // let updatedListOfCarts = [...cart];
    // if (updatedListOfCarts[cartIndex].products.length === 1) {
    //   // delete the whole cart
    //   axios.delete(`https://fakestoreapi.com/cart/${updatedListOfCarts[cartIndex].id}`)
    //     .then((response) => {
    //       toaster.success('Cart deleted');
    //       updatedListOfCarts = updatedListOfCarts.filter((cart, index) => index !== cartIndex);
    //       setCart(updatedListOfCarts);
    //       setDisabled(false);
    //     })
    //     .catch(() => {
    //       toaster.warning('Something went wrong, Try again');
    //       setDisabled(false);
    //     });
    // } else {
    //   // delete just one product
    //   updatedListOfCarts.forEach((cart, index) => {
    //     if (cartIndex === index) {
    //       cart.products = cart.products.filter((product) => product.data.id !== productId);
    //     }
    //   });

    //   const updatedCart = {
    //     ...updatedListOfCarts[cartIndex],
    //     products: updatedListOfCarts[cartIndex].products.map((prod) => ({
    //       productId: prod.productId,
    //       quantity: prod.quantity,
    //     })),
    //   };

    //   axios.put(`https://fakestoreapi.com/cart/${updatedCart.id}`, updatedCart)
    //     .then((response) => {
    //       toaster.success('Product deleted');
    //       setCart(updatedListOfCarts);
    //       setDisabled(false);
    //     })
    //     .catch(() => {
    //       toaster.warning('Something went wrong, try again');
    //     });
    // }
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
        <>
            <div className="cart-products-container">
              <div className="cart-products-title">
                <p>{`Cart`}</p>
                <p>{`Created: ${new Date().toDateString()}`}</p>
                {/* <p>{`Created: ${moment().format('MMM Do YY')}`}</p> */}
              </div>

              {cart.products.map((product, productIndex) => (
                <div className="cart-products-wrapper" key={`cart-product-${product.id}`}>
                  <Link to={`/${product.id}`}>
                    <img alt="CartProduct" src={product.image} data-cy={`product-cart-image-${product?.id}`} />
                  </Link>

                  <div className="cart-products-content" data-cy={`product-cart-title-${product?.id}`}>
                    <p>{product.title}</p>
                    <div className="cart-products-pricing">
                      <div className="quantity-container">
                        <p>{'Quantity: '}</p>
                        <QuantityBar
                          label="Quantity:"
                          quantity={product.quantity}
                        />
                      </div>
                      <p>{`Price: $ ${product.price}`}</p>
                    </div>
                    <p>{`Total: $ ${(product.price * product.quantity).toFixed(2)}`}</p>
                    <Button
                      data-cy={`delete-button-${product.id}`}
                      disabled={disabled}
                      onClick={() => {
                        removeProductCart(product.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}

              <div className="payment-button">
                <Button className="buy-products-cart-button" appearance="primary" marginTop={10}>Proceed with the payment</Button>
              </div>
            </div>
        </>
      </Pane>            
      )}
    </SideSheet>
  );
};

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Cart);