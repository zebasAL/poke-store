import { useState, KeyboardEvent, type FC, Ref, ReactElement, useEffect, useRef, SyntheticEvent, LegacyRef, SetStateAction } from 'react';
import { PokeItem } from "../../models"

type List = {
  handleClick: (param: string) => void;
  setResults: (param: Array<PokeItem>) => void;
  results: Array<PokeItem>;
}

export const List: FC<List> = ({ setResults, results, handleClick }) => {
  const autoCompleteRef = useRef<Ref<HTMLUListElement> | any>(null);

  useEffect(() => {
    if (!autoCompleteRef) return;
    const handleClickOutSide = (e: any) => {
      if (autoCompleteRef.current && !autoCompleteRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener("click", handleClickOutSide, true);
    return () => {
      document.removeEventListener("click", handleClickOutSide, true);
    }

  }, []);

  return (
    <>
    {results.length > 0 && (
    <ul ref={autoCompleteRef} className="autocomplete-list">
      {results.map((result) => (
        <li key={result.name} onClick={() => handleClick(result.url)}>{result.name}</li>
      ))}
    </ul>
    )}
    </>
  )
}
