import { type FC, ReactElement } from 'react';

interface ButtonProps {
  handleLoadingButton: () => void;
  isLoading: Boolean;
}

const LoadMoreButton: FC<ButtonProps> = ({
  handleLoadingButton,
  isLoading,
}): ReactElement => (
  <>
    {
    (isLoading)
      ? (
        (
          <div className="loader">Loading...</div>
        )
      )
      : (
        <button className="load-more-pokemons-button" onClick={() => handleLoadingButton()} type="button">
          <i style={{ transform: 'rotate(45deg)' }} className="arrow" />
        </button>
      )
    }
  </>
);

export default LoadMoreButton;
