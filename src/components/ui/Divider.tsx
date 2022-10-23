export const Divider = ({
  label,
}: { label: string }) => (
  <div className="divider-line-container">
    <div className="divider-line" />
    <p>{label}</p>
    <div className="divider-line" />
  </div>
);

export default Divider;
