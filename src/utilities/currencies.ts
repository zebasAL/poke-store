import argentina from "../assets/currency-icons/argentina.svg";
import brazil from "../assets/currency-icons/brazil.svg";
import chile from "../assets/currency-icons/chile.svg";
import colombia from "../assets/currency-icons/colombia.svg";
import mexico from "../assets/currency-icons/mexico.svg";
import uruguay from "../assets/currency-icons/uruguay.svg";
import usa from "../assets/currency-icons/usa.svg";

export const availableCurrencies = [
    { currencyName: "American Dollar", currencyCode: "USD", country: "USA", symbol: "$", image: usa },
    { currencyName: "Mexican Peso", currencyCode: "MXN", country: "Mexico", symbol: "$", image: mexico },
    { currencyName: "Chilean Peso", currencyCode: "CLP", country: "Chile", symbol: "$", image: chile },
    { currencyName: "Argentine Peso", currencyCode: "ARS", country: "Argentina", symbol: "$", image: argentina },
    { currencyName: "Uruguayan Peso", currencyCode: "UYU", country: "Uruguay", symbol: "$U", image: uruguay },
    { currencyName: "Colombian Peso", currencyCode: "COP", country: "Colombia", symbol: "$", image: colombia },
    { currencyName: "Brazilian Real", currencyCode: "BRL", country: "Brazil", symbol: "R$", image: brazil },
  ];