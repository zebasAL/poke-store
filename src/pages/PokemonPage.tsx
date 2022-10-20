import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Button } from 'evergreen-ui';
import { QuantityBar, ProgressBar, Divider, Card, UnkownPokemon, Loader } from "../components"
import { ReduxState , MapState } from "../models";
import { maxStat } from "../helpers";
import { useFetchDetails } from "../hooks";

type PokemonView = {
  isShiny: ReduxState["isShiny"];
}

const mapStateToProps: MapState<PokemonView> = (state) => ({ isShiny: state.isShiny });

const PokemonDetailsView = ({
  isShiny,
}: { isShiny?: ReduxState["isShiny"] }): ReactElement => {
  const {pokemon, error } = useFetchDetails();

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
              <p id="pokemon-card-price">{`Price: $${pokemon?.price ?? 1}`}</p>
              <QuantityBar label="Quantity:" />
              <div className="product-view-add-and-buy-btns">
                <Button appearance="secondary">Add to cart</Button>
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

export default connect(mapStateToProps, null)(PokemonDetailsView);

