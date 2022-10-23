import { useState, type FC, ReactElement } from "react";
import { Link } from 'react-router-dom';
import { Button, Icon, UserIcon, ShoppingCartIcon, Pill } from "evergreen-ui";
import { connect } from 'react-redux';
import { MapState , MapDispatch, ReduxActions, ReduxState } from '../../models';
import { default as Cart } from '../ui/Cart';
import FlipSwitch from '../ui/FlipSwitch';
import logo from '../../assets/logo.svg';

type States = {
  isShiny: ReduxState["isShiny"];
  cart: ReduxState["cart"];
};

type Actions = {
  setIsShiny: ReduxActions["setIsShiny"]
};

const mapStateToProps: MapState<States> = (state) => ({
  isShiny: state.isShiny,
  cart: state.cart,
});

const mapDispatchToProps: MapDispatch<Actions> = (dispatch) => ({
  setIsShiny: (values) => dispatch({
    type: 'SET_IS_SHINY',
    payload: values,
  }),
});

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
type Props = StateProps & DispatchProps;

const Navbar: FC<Props> = ({
  cart,
  isShiny,
  setIsShiny,
}): ReactElement => {
  const [showCart, setShowCart] = useState<boolean>(false);

  return (
    <nav id="nav">
      <div className="navbar-container">
        <FlipSwitch isOn={isShiny} setIsOff={setIsShiny} />
        <Link to="/">
          <img
            className="pokemon-logo"
            src={logo}
            alt="logo"
          />
        </Link>
        <Button id="transparent-button" type="button" background="transparent" border="none" onClick={() => setShowCart(!showCart)}>
          <Icon id="user-login-label" color="#a7a8b7" icon={UserIcon} size={25} />
        </Button>
        <Button
          position="relative"
          id="transparent-button"
          onClick={() => setShowCart(!showCart)}
          background="transparent"
          border="none"
        >
          <Icon className="transparent-button" color="#a7a8b7"  icon={ShoppingCartIcon} padding={0} size={25} />
          <Pill data-cy="cart-products-number" marginY="10px" paddingX={4} display="block">
            {cart?.products.length ?? 0}
          </Pill>
        </Button>
      </div>
      {showCart && (<Cart cart={cart} isCartOpen={showCart} setIsCartOpen={setShowCart} />)}
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
