import { useState, ReactElement, type FC } from "react";
import { connect } from "react-redux";
import { Button, toaster } from "evergreen-ui";
import { QuantityBar, ProgressBar, Divider, Card, UnkownPokemon, Loader } from "../components"
import { ReduxState, ReduxActions, MapState, MapDispatch } from "../models";
import { maxStat } from "../helpers";
import { useFetchDetails } from "../hooks";

type PokemonView = {
  isShiny: ReduxState["isShiny"];
  currency: ReduxState["currency"],
  cart: ReduxState["cart"],
}
type Actions = {
  setCart: ReduxActions["setCart"];
}
const mapStateToProps: MapState<PokemonView> = (state) => ({
  isShiny: state.isShiny,
  currency: state.currency,
  cart: state.cart,
});
const mapDispatchToProps: MapDispatch<Actions> = (dispatch) => ({
  setCart: (values) => dispatch({
    type: "SET_CART",
    payload: values,
  }),
});
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const PokemonDetailsView: FC<Props> = ({
  isShiny,
  currency,
  cart,
  setCart,
}): ReactElement => {
  const [quantity, setQuantity] = useState<number>(1);
  const { pokemon, error } = useFetchDetails();

  const handleAddNewProduct = () => {
    if (!pokemon) return;
    if (cart === null) {
      setCart({
        date: new Date().toISOString(),
        id: 1,
        userId: 1,
        products: [
          {
            id: 1,
            productId: pokemon.id,
            quantity,
            image: pokemon.sprites?.front_default ?? "",
            title: pokemon.name,
            price: pokemon.price,
          }]
      });
    } else {
      setCart({
        date: cart.date,
        id: cart.id,
        userId: cart.userId,
        products: [
        ...cart.products,
        {
          // Assigns an available id, always seeking the lowest number
          id: cart.products.sort((a, b) => a.id - b.id).reduce((prev, current) => prev === current.id ? prev + 1 : prev, 1),
          productId: pokemon.id,
          quantity,
          image: pokemon.sprites?.front_default ?? "",
          title: pokemon.name,
          price: pokemon.price * quantity,
        }],
      });
    }
    toaster.success("The pokemon was added to your pokedex", {
      id: "forbidden-action",
    });
  };

  if (error) return (<UnkownPokemon/>);

  return (
    <div className="pokemon-details-view-container">
      {pokemon ? (
      <Card>
        <div className="pokemons-wrapper">
          <div className="pokemon-details">
            <img
              alt="pokemon"
              src={isShiny
                ? pokemon.sprites?.front_shiny ?? ""
                : pokemon.sprites?.front_default ?? ""
              }
            />
            <div className="pokemon-card-info">
              <p id="pokemon-card-id">#{String(pokemon.id).padStart(4, "0")}</p>
              <p id="pokemon-card-name">{pokemon.name}</p>
              <p id="pokemon-card-height">{`Height :${pokemon.height / 10}m`}</p>
              <p id="pokemon-card-weight">{`Weight : ${((pokemon.weight ?? 0) * 0.1).toFixed()}kg`}</p>
              <p id="pokemon-card-price">{`Price: ${currency.symbol + " " + ((pokemon?.price ?? 1) * currency.quote).toFixed(2)}`}</p>
              <QuantityBar label="Quantity:" quantity={quantity} setQuantity={setQuantity} />
              <div className="product-view-add-and-buy-btns">
                <Button appearance="secondary" onClick={handleAddNewProduct}>Add to cart</Button>
                <Button appearance="primary" intent="danger">Buy it now</Button>
              </div>
            </div>
          </div>
          <p className="pokemon-card-description" style={{ margin: "30px 0", fontSize: "15px" }}>{pokemon.description}</p>
        </div>
        <Divider label="STATS" />
        <div className="pokemon-card-stats">
          {pokemon.stats.map((stat: any) => (
            <div key={stat.stat.name}>
              <ProgressBar
                percentage={maxStat(stat)}
                progressValue={stat.base_stat}
                label={stat.stat.name.toUpperCase()}
              />
            </div>
          ))}
        </div>
      </Card>
      ) : (<Loader />)}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailsView);

