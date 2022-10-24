import { useState, type FC, ReactElement } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Icon, ShoppingCartIcon, Pill, toaster } from "evergreen-ui";
import { connect } from 'react-redux';
import { MapState , MapDispatch, ReduxActions, ReduxState } from '../../models';
import { Cart, AutoCompleteField } from '../';
import { FlipSwitch, CurrencyList } from '../';
import { usePokemonsName } from "../../hooks";
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
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Navbar: FC<Props> = ({
  cart,
  isShiny,
  setIsShiny,
}): ReactElement => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    allPokemonsName,
} = usePokemonsName();

  /**
   * Redirects to selected options
   * @param url endpoint to get pokemon data
   */
  const handleClick = (url: string) => {
    const id = url.split("/").map((item) => Number(item)).filter((item) => item);
    if (typeof id[0] === "number") {
      navigate(`/${id[0]}`);
    } else {
      toaster.warning("it was impossible to get close to the pokemon", {
        id: "forbidden-action",
      });
    }
  };

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
        <div className="flex-center">
          <CurrencyList />
          <Button
            position="relative"
            className="transparent-button"
            id="cart-display-button"
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
      </div>
      <AutoCompleteField
        handleClick={(value: string) => handleClick(value)}
        values={allPokemonsName}
      />
      {showCart && (<Cart isCartOpen={showCart} setIsCartOpen={setShowCart} />)}
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
