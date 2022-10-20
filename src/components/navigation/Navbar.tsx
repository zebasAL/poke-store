import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MapState , MapDispatch, ReduxActions } from '../../models';
import FlipSwitch from '../ui/FlipSwitch';
import logo from '../../assets/logo.svg';

const Navbar: any = ({
  isShiny,
  setIsShiny,
}: { isShiny: boolean, setIsShiny: ReduxActions["setIsShiny"] }) => (
  <>
    <div className="navbar-container">
      <div>
        <FlipSwitch isOn={isShiny} setIsOff={setIsShiny} />
        <Link to="/">
          <img
            className="pokemon-logo"
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
    </div>
  </>
);

const mapStateToProps: MapState = (state) => ({ isShiny: state.isShiny });

const mapDispatchToProps: MapDispatch = (dispatch) => ({
  setIsShiny: (values) => dispatch({
    type: 'SET_IS_SHINY',
    payload: values,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
