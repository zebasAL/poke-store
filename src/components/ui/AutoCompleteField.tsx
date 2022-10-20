import React, { KeyboardEvent, type FC, ReactElement } from 'react';

interface Props {
  searchValue: string;
  setSearchValue: (param: string) => void;
  handleEnter: (param: KeyboardEvent) => void;
}

const AutoCompleteField: FC<Props> = ({
  searchValue,
  setSearchValue,
  handleEnter,
}): ReactElement => (
  <div className="input-container">
    <input
      className="autocomplete-input-field"
      type="text"
      placeholder="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={(e) => ((e.key === 'Enter') && handleEnter(e))}
    />
  </div>
);

export default AutoCompleteField;
