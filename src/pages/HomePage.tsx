import { useRef, useCallback, useState, useEffect, type FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon, ArrowUpIcon } from "evergreen-ui";
import { ReduxState, MapState } from "../models";
import { useFectchPokemons } from "../hooks";
import { PokemonCard, Loader } from "../components";
import { images } from "../url";

type HomePage = {
  isShiny: ReduxState["isShiny"],
  currency: ReduxState["currency"],
}
const mapStateToProps: MapState<HomePage> = (state) => ({
    isShiny: state.isShiny,
    currency: state.currency,
});
type Props = ReturnType<typeof mapStateToProps>;

const HomePage: FC<Props> = ({
  isShiny,
  currency,
}): ReactElement => {
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState<boolean>(false);
  const {
    pokemons,
    isLoading,
    hasMore,
    limitPokemons: limit,
    handleOffset,
} = useFectchPokemons();
  let noOfCalls = 0;

  /**
   * When total matches with number of calls, displays all images that already were rendered by browser.
   * 
   * @param total represents the number of pokemons that should be displayed
   * @param f count every time an image of pokemon is rendered by browser
   * @returns 
   */
  const countNuberOfPokemons = useCallback((total: number, callback: () => void) => {
    return () => {
      noOfCalls = noOfCalls + 1;
      if (total === noOfCalls) {
        callback();
      }
    };
  }, []);

  /**
   * ensures that, images are going to be visible when all images are full loaded 
   * 
   */
  const onLoad = countNuberOfPokemons((pokemons.length), () => {
    document.querySelectorAll(".pokemons-wrapper").forEach((item: any) => {
      item.style.opacity = "1";
    })
  });

  const observer = useRef<any>(null);
  const lastElementRef = useCallback((node: HTMLImageElement) => {
    if (isLoading) return;
    if (observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleOffset()
      }
    })
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const scrollToTop = useCallback(() => {
    if (window.scrollY > 400) {
      setShowScrollToTopBtn(true);
    } else {
      setShowScrollToTopBtn(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollToTop);

    return () => {
      window.removeEventListener("scroll" , scrollToTop);
    };
  }, []);

  return (
    <div className="cards-display details-off">
      <ul className="pokemons-cards-container">
        {pokemons.length > 0 && pokemons.map((pokemon, index) => {
          if (pokemons.length === index + 1) {
            return (
              <div key={pokemon.id} style={{ opacity: "0" }} className="pokemons-wrapper">
                <div className="pokemon-details">
                  <Link to={`/${pokemon.id}`}>
                    <img
                      ref={lastElementRef}
                      alt="pokemon"
                      src={isShiny === true 
                        ? (pokemon.sprites?.front_shiny ?? images.unhandledImage)
                        : (pokemon.sprites?.front_default ?? images.unhandledImage)}
                      onLoad={onLoad}
                      onError={onLoad}
                    />
                    <div className="pokemon-card-info">
                      <p id="pokemon-card-id">{`# ${String(pokemon.id).padStart(4, "0")}`}</p>
                      <p id="pokemon-card-name">{pokemon.name}</p>
                      <p id="pokemon-card-height">{`Height :${pokemon.height / 10}m`}</p>
                      <p id="pokemon-card-weight">{`Weight :${(pokemon.weight * 0.1).toFixed()}kg`}</p>
                      <p id="pokemon-card-price">{`Price: $${(pokemon.height * 0.1).toFixed()}`}</p>
                      <p id="pokemon-card-price">{`Price: ${currency.symbol + " " + ((pokemon?.price ?? 1) * currency.quote).toFixed(2)}`}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          } else {
            return (<PokemonCard currency={currency} styles={{ opacity: "0" }} key={index} pokemon={pokemon} onLoad={onLoad} isShiny={isShiny} />)
          }
        })}
      </ul>
      {isLoading && (<Loader height={200} />)}
      {showScrollToTopBtn && (
      <button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }}
        className="scroll-button"
      >
        <Icon icon={ArrowUpIcon} size={15} />
      </button>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(HomePage);
