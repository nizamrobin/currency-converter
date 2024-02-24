import { useState, useEffect } from "react";
import CurrencyCard from "./CurrencyCard";
import BtnSwitch from "./BtnSwitch";
import Nav from "./Nav";

export default function CurrencyConverter() {
  const [currencyDB, setcurrencyDB] = useState(null); // currency details fetch from API
  const [exchangeRates, setExchangeRates] = useState(null); // set exchange rates from API

  const [fromCurrencyId, setFromCurrencyId] = useState();
  const [toCurrencyId, setToCurrencyId] = useState();
  const [fromCurrencyName, setFromCurrencyName] = useState();
  const [toCurrencyName, setToCurrencyName] = useState();
  const [fromCurrencySymbol, setFromCurrencySymbol] = useState();
  const [toCurrencySymbol, setToCurrencySymbol] = useState();
  const [fromCurrencyValue, setFromCurrencyValue] = useState(1);
  const [toCurrencyValue, setToCurrencyValue] = useState(0.93);

  const currencyURL =
    "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_ez90wL17LjD3xpqABtrBRl7R2YatlrIppQbTSj44";
  const exchangeRateUrl =
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ez90wL17LjD3xpqABtrBRl7R2YatlrIppQbTSj44";

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
      const firstCurrency = Object.keys(res.data)[1];
      const secondCurrency = Object.keys(res.data)[0];
      setFromCurrencyId(firstCurrency);
      setToCurrencyId(secondCurrency);
      setFromCurrencyName(dbArray[1].name);
      setToCurrencyName(dbArray[0].name);
      setFromCurrencySymbol(dbArray[1].symbol_native);
      setToCurrencySymbol(dbArray[0].symbol_native);
    });
  }, []);

  // fetch latest exchange rates from api call and assigned to exchangedRates state
  useEffect(() => {
    async function exchangeRateData() {
      const response = await fetch(exchangeRateUrl);
      const exchangeRateData = await response.json();
      return exchangeRateData;
    }
    exchangeRateData().then((data) => setExchangeRates(data.data));
  }, []);

  // Handling re-rendering based on the change of the states
  useEffect(() => {
    if (
      exchangeRates &&
      Math.abs(
        toCurrencyValue -
          (fromCurrencyValue / exchangeRates[`${fromCurrencyId}`]) *
            exchangeRates[`${toCurrencyId}`]
      ) > 0.05
    ) {
      setToCurrencyValue(
        Math.round(
          (fromCurrencyValue / exchangeRates[`${fromCurrencyId}`]) *
            exchangeRates[`${toCurrencyId}`] *
            100
        ) / 100
      );
    }
  }, [exchangeRates, fromCurrencyId, fromCurrencyValue, toCurrencyId]);

  useEffect(() => {
    if (
      exchangeRates &&
      Math.abs(
        fromCurrencyValue -
          (toCurrencyValue / exchangeRates[`${toCurrencyId}`]) *
            exchangeRates[`${fromCurrencyId}`]
      ) > 0.05
    ) {
      setFromCurrencyValue(
        Math.round(
          (toCurrencyValue / exchangeRates[`${toCurrencyId}`]) *
            exchangeRates[`${fromCurrencyId}`] *
            100
        ) / 100
      );
    }
  }, [exchangeRates, toCurrencyValue]);

  // function for handling changing the value of inputs
  const handleValue = (id, value) => {
    if (id === fromCurrencyId) {
      setFromCurrencyValue(value);
    } else if (id === toCurrencyId) {
      setToCurrencyValue(value);
    }
  };

  // functions for handling the changing of the currency codes
  const handleCurrencyFrom = (id, name, symbol) => {
    setFromCurrencyId(id);
    setFromCurrencyName(name);
    setFromCurrencySymbol(symbol);
  };
  const handleCurrencyTo = (id, name, symbol) => {
    setToCurrencyId(id);
    setToCurrencyName(name);
    setToCurrencySymbol(symbol);
  };

  // handle Switch Operation
  const handleSwitchBtn = () => {
    setFromCurrencyId(toCurrencyId);
    setFromCurrencyName(toCurrencyName);
    setFromCurrencySymbol(toCurrencySymbol);
    setToCurrencyId(fromCurrencyId);
    setToCurrencyName(fromCurrencyName);
    setToCurrencySymbol(fromCurrencySymbol);
  };
  // JSX
  return (
    currencyDB &&
    fromCurrencyId &&
    toCurrencyId && (
      <div className="bg-slate-100 h-screen p-4 w-screen md:flex md:flex-col md:justify-center md:-translate-y-8">
        <Nav />

        {/* Main section */}
        <section className="main relative gap-4 md:flex md:justify-around md:items-center ">
          {currencyDB !== null && (
            <CurrencyCard
              currencyDB={currencyDB}
              currencyId={fromCurrencyId}
              currencyName={fromCurrencyName}
              currencySymbol={fromCurrencySymbol}
              exchangeValue={fromCurrencyValue}
              handleValue={handleValue}
              handleCurrency={handleCurrencyFrom}
              className={"md:w-1/3 md:flex-col-reverse"}
            />
          )}
          <BtnSwitch
            onClick={handleSwitchBtn}
            className={
              "absolute right-8 top-1/2 -translate-y-1/2 md:static md:transform-none"
            }
          />
          {currencyDB !== null && (
            <CurrencyCard
              currencyDB={currencyDB}
              currencyId={toCurrencyId}
              currencyName={toCurrencyName}
              currencySymbol={toCurrencySymbol}
              exchangeValue={toCurrencyValue}
              handleCurrency={handleCurrencyTo}
              handleValue={handleValue}
              className={"md:w-1/3"}
              classes={"flex-col-reverse"}
            />
          )}
        </section>

        {/* <FooterNav /> */}
      </div>
    )
  );
}
