import { ReactElement, ReactNode } from 'react';

export const Card = ({
  children,
}: { children: ReactNode }): ReactElement => (
  <div className="pokemon-card-wrapper">
    {children}
  </div>
);
