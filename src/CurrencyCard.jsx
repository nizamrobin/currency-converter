import { useCallback, useEffect, useRef, useState } from "react";

export default function CurrencyCard({
  arr,
  classes,
  handleExchange,
  value,
  exchangeId,
  defaultValue,
}) {
  const [currencyName, setCurrencyName] = useState(defaultValue);
  const [currencyID, setCurrencyID] = useState();
  const [currencyData, setCurrencyData] = useState();
  const ref = useRef("");

  // set currnecy name to currencyName state
  // const handleCurrency = (e) => {
  //   setCurrencyName(e.currentTarget.value);
  //   // handleExchange(ref);
  //   // console.log(currencyName);
  // };

  // set currency data and return exchangeId depending on the selection of option of currency list
  useEffect(() => {
    arr.map((item) => {
      if (currencyName === item.name) {
        setCurrencyData(item);
        setCurrencyID(item.code);
        exchangeId(item.code, ref);
      }
    });
  }, [currencyName, exchangeId, arr]);

  return (
    currencyData !== null && (
      <div
        className={`currencyCard p-4 rounded-2xl flex flex-col bg-white my-4 ${classes}`}
      >
        <div className="header flex justify-between p-1 font-bold">
          {currencyData && <h3>{currencyData.code}</h3>}

          <select
            className="bg-transparent"
            id={currencyID}
            onChange={(e) => {
              setCurrencyName(e.currentTarget.value);
              // handleExchange(e.currentTarget.id);
              // console.log(e.currentTarget.id);
            }}
            defaultValue={defaultValue}
          >
            {/* populate currency items to option of select tag */}
            {arr.map((item) => (
              <option
                key={item.code}
                value={item.name}
                id={item.code}
                className="appearance-none"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 p-1 flex items-baseline text-accent font-light">
          {currencyData && (
            <span className="text-2xl">{currencyData.symbol}</span>
          )}
          {currencyData && (
            <input
              ref={ref}
              value={value}
              id={currencyID}
              type="number"
              className="text-5xl w-1/2"
              onChange={() => handleExchange(ref)}
            />
          )}
        </div>
      </div>
    )
  );
}
