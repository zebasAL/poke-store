import { useState, KeyboardEvent, type FC, ReactElement, useEffect, useRef, SyntheticEvent, LegacyRef, SetStateAction } from 'react';
import { PokeItem } from "../../models"
import { List } from "./List";

type Props = {
  values: Array<PokeItem>;
  handleClick: (param: string) => void;
}

export const AutoCompleteField: FC<Props> = ({
  handleClick,
  values,
}): ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<Props["values"]>([]);

  useEffect(() => {
    if (!inputValue && !results.length) return;
    if (!inputValue && results.length) return setResults([]);

    const listValues = values.filter((value) => value.name.includes(inputValue.toLocaleLowerCase()))
    if (listValues.length > 0) {
      setResults(listValues);
    } else {
      setResults([{ name: "Pokemon not found", url: "" }]);
    }

  }, [inputValue]);

  return (
    <>
      <div className="input-container">
        <input
          className="autocomplete-input-field"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <List
        handleClick={(value: string) => handleClick(value)}
        setResults={(value: SetStateAction<Array<PokeItem>>) => setResults(value)}
        results={results}
      />
    </>
  );
};

