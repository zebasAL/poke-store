import { useState, type FC } from "react";
import { connect } from "react-redux";
import { useCurrencies } from "../../hooks";
import { MapState, MapDispatch, ReduxActions, ReduxState } from "../../models";

type States = {
  currency: ReduxState["currency"];
};
type Actions = {
  setCurrency: ReduxActions["setCurrency"];
};
const mapStateToProps: MapState<States> = (state) => (
  {
    currency: state.currency,
  });
const mapDispatchToProps: MapDispatch<Actions> = (dispatch) => ({
  setCurrency: (values) => dispatch({
    type: "SET_CURRENCY",
    payload: values,
  }),
});
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const SelectList: FC<Props> = ({
  currency,
  setCurrency,
}) => {
  const [displayList, setDisplayList] = useState<boolean>(false);
  const {
    currencies,
    isLoading,
  } = useCurrencies();

  const handleClick = (currency: ReduxState["currency"]) => {
    setCurrency(currency);
    setDisplayList(false);
  };

  return (
    <div>
      <button
        style={{ backgroundColor: "transparent", color: "#ffff", border: "none" }}
        type="button"
        id="currency-list-btn"
        onClick={() => setDisplayList((prevState) => !prevState)}
        disabled={isLoading || (!isLoading && !currencies.length) }
      >
        <div  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <img
            style={{ borderRadius: "3px", width: "30px", height: "15px" }}
            alt="country-img"
            src={currency.image}
          />
          <p style={{ margin: "5px 0 5px 10px", fontSize: "10px" }}>{currency.currencyCode}</p>
        </div>
      </button>
      {displayList && (
        <div
          style={{
            position: "absolute",
            top: "0",
            color: "black",
            zIndex: "1",
            transform: "translate(-15px, 55px)",
            backgroundColor: "#fafafa",
            borderRadius: "10px",
            padding: "5px 20px",
            boxShadow: "0px 0px 4px 1px #2d2e2e3b",
          }}
        >
          {currencies.map((currency) => (
            <div
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              key={currency.currencyCode}
              onClick={() => handleClick(currency)}
            >
              <img
                style={{ borderRadius: "3px", width: "30px", height: "15px" }}
                alt={currency.country}
                src={currency.image}
              />
              <p style={{ margin: "5px 0 5px 10px", fontSize: "10px" }}>{currency.currencyCode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CurrencyList = connect(mapStateToProps, mapDispatchToProps)(SelectList);
