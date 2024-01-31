import { useState, useEffect, useCallback, useRef } from "react";
import CurrencyCard from "./CurrencyCard";
import BtnSwitch from "./BtnSwitch";

export default function CurrencyConverter() {
  const [currencyDB, setcurrencyDB] = useState(null); // currency details fetch from API
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrencyId, setFromCurrencyId] = useState();
  const [toCurrencyId, setToCurrencyId] = useState();
  const [fromCurrencyName, setFromCurrencyName] = useState();
  const [toCurrencyName, setToCurrencyName] = useState();

  const [exchangeRates, setExchangeRates] = useState(null); // set exchange rates from API
  const [exchangeValueFrom, setExchangeValueFrom] = useState(1); // set exchange value
  const [exchangeValueTo, setExchangeValueTo] = useState(1.09); // set exchange value
  const [ExchangeIdFrom, setExchangeIdFrom] = useState("USD"); //Exchange id code like USD, EUR
  const [ExchangeIdTo, setExchangeIdTo] = useState("EUR"); //Exchange id code like USD, EUR

  const currencyURL =
    "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_WvRyy0w6431rb0ophS7XESZugPknhooLfOVOkGK6";

  // fetch currency db from API call
  useEffect(() => {
    const f = async () => {
      const response = await fetch(currencyURL).then((res) => res.json());
      return response;
    };
    f().then((res) => {
      const dbObj = JSON.parse(JSON.stringify(res.data));
      const dbArray = [];
      for (let item in dbObj) {
        dbArray.push(dbObj[item]);
      }
      setcurrencyDB(dbArray);
      setCurrencyOptions([...Object.keys(res.data)]);
      setFromCurrencyId(Object.keys(res.data)[1]);
      setToCurrencyId(Object.keys(res.data)[0]);
      setFromCurrencyName(dbArray[1].name);
      setToCurrencyName(dbArray[0].name);
    });
    // console.log(f().then((res) => console.log(Object.keys(res.data))));
  }, []);

  const handleCurrency = (id, name, value) => {
    console.log(id, name, value);
  };

  const handleValue = (flag, referrence) => {
    // console.log(referrence.current.id, referrence.current.value);
    if (ExchangeIdFrom === ExchangeIdTo) {
      // console.log("1");
      setExchangeValueFrom(referrence.current.value);
      setExchangeValueTo(referrence.current.value);
    }
    if (ExchangeIdFrom !== ExchangeIdTo) {
      if (ExchangeIdTo === referrence.current.id) {
        // console.log("2");
        setExchangeValueTo(referrence.current.value);
        setExchangeValueFrom(
          (
            (referrence.current.value / exchangeRates[ExchangeIdFrom]) *
            exchangeRates[ExchangeIdTo]
          ).toFixed(2)
        );
      }
      if (ExchangeIdFrom === referrence.current.id) {
        // console.log("3");
        setExchangeValueFrom(referrence.current.value);
        setExchangeValueTo(
          (
            (referrence.current.value / exchangeRates[ExchangeIdTo]) *
            exchangeRates[ExchangeIdFrom]
          ).toFixed(2)
        );
      }
    }
  };
  const handleIdFrom = (id, ref) => {
    // console.log("handledIdFrom");
    const flag = "idFrom";
    setExchangeIdFrom(id);
    handleValue(flag, ref);
  };
  const handleIdTo = (id, ref) => {
    // console.log("handledIdTo");
    const flag = "idTo";
    setExchangeIdTo(id);
    handleValue(flag, ref);
  };
  // calculate the exchange currency value and set to input field of the other currencyCard component
  const handleExchangeFrom = (referrence) => {
    console.log("input1");
    const flag = "updateValue";
    handleValue(flag, referrence);
  };

  const handleExchangeTo = (referrence) => {
    console.log("input2");
    const flag = "updateValue";
    handleValue(flag, referrence);
  };

  // fetch latest exchange rates from api call and assigned to exchangedRates state
  useEffect(() => {
    const url =
      "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_WvRyy0w6431rb0ophS7XESZugPknhooLfOVOkGK6";
    async function exchangeRates() {
      const response = await fetch(url);
      const exchangeRates = await response.json();
      return exchangeRates;
    }
    exchangeRates().then((data) => setExchangeRates(data.data));
  }, []);

  // JSX
  return (
    <div className="container bg-slate-200 p-4">
      {/* <Nav /> */}

      {/* Main section */}
      <section className="main relative gap-4">
        <h2>{`${ExchangeIdFrom} ${ExchangeIdTo}`}</h2>
        {currencyDB !== null && (
          <CurrencyCard
            currencyDB={currencyDB}
            currencyOptions={currencyOptions}
            currencyId={fromCurrencyId}
            currencyName={fromCurrencyName}
            handleCurrency={handleCurrency}
            // value={exchangeValueFrom}
            // handleExchange={handleExchangeFrom}
            // defaultValue={"US Dollar"}
          />
        )}
        <BtnSwitch />
        {currencyDB !== null && (
          <CurrencyCard
            currencyDB={currencyDB}
            currencyOptions={currencyOptions}
            currencyId={toCurrencyId}
            currencyName={toCurrencyName}
            handleCurrency={handleCurrency}
            classes={"flex-col-reverse"}
            // value={exchangeValueTo}
            // handleExchange={handleExchangeTo}
            // defaultValue={"Euro"}
          />
        )}
      </section>

      {/* <FooterNav /> */}
    </div>
  );
}
