import { ReactElement, ReactNode } from 'react';

const Card = ({
  children,
}: { children: ReactNode }): ReactElement => (
  <div className="pokemon-card-wrapper">
    {children}
  </div>
);

export default Card;
