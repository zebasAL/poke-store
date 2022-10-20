import { FC } from 'react';

interface ProgressBar {
  percentage: string;
  progressValue: string;
  label: number;
}

const ProgressBar: FC<ProgressBar> = ({
  percentage,
  progressValue,
  label,
}) => (
  <div className="progress-bar-container">
    <div className="progress-bar-label">{label}</div>
    <div className="progress-bar-wrapper">
      <div style={{ width: `${percentage}%` }} className="progress-bar" />
      <p className="progress-value">{progressValue}</p>
    </div>
  </div>
);

export default ProgressBar;
