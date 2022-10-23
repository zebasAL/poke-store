import { Pane, Spinner } from 'evergreen-ui';

export const Loader = ({
  height,
}: { height?: number }) => (
  <Pane display="flex" alignItems="center" justifyContent="center" height={height ?? 400}>
    <Spinner />
  </Pane>
);