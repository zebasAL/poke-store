import { useState, useEffect } from "react";
import { toaster } from "evergreen-ui";
import { CurrencyService } from "../services";
import { FormatedCurrency } from "../models";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Array<FormatedCurrency>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    CurrencyService.getCurrencies(["all"])
      .then((response: Array<FormatedCurrency>) => {
        setCurrencies(response);
      })
      .catch((err) => {
        toaster.notify("Currency exchange is disabled", {
          description: "Looks like team rocket is giving us trouble",
          id: "forbidden-action",
        })
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return {
    currencies,
    isLoading,
  }
};