import { useCallback, useEffect, useRef, useState } from "react";

export default function CurrencyCard({
  currencyDB,
  currencyOptions,
  currencyId,
  currencyName,
  handleCurrency,
  classes,
  // arr,
  // handleExchange,
  // value,
  // defaultValue,
}) {
  // console.log(currencyId, currencyName, currencyDB);
  // const [currencyName, setCurrencyName] = useState(defaultValue);
  // const [currencyID, setCurrencyID] = useState();
  // const [currencyData, setCurrencyData] = useState();
  // const ref = useRef("");
  // console.log(currencyDB);
  // set currnecy name to currencyName state

  // set currency data and return exchangeId depending on the selection of option of currency list
  useEffect(
    (e) => {
      handleCurrency(e.currentTarget.value, null, null);
      // currencyOptions.map((item) => {
      //   if (currencyName === item.name) {
      //     setCurrencyData(item);
      //     setCurrencyID(item.code);
      //     // exchangeId(item.code, ref);
      //   }
      // });
    },
    [currencyName, arr]
  );

  return (
    // currencyData !== null && (
    <div
      className={`currencyCard p-4 rounded-2xl flex flex-col bg-white my-4 ${classes}`}
    >
      <div className="header flex justify-between p-1 font-bold">
        <h3>{currencyId}</h3>

        <select
          className="bg-transparent"
          id={currencyId}
          value={currencyName}
          onChange={handleCurrency}
        >
          {/* populate currency items to option of select tag */}
          {currencyDB.map((item) => (
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
        <span className="text-2xl">{}</span>
        {/* {currencyData && ( */}
        <input id={currencyId} type="number" className="text-5xl w-1/2" />
        {/* )} */}
      </div>
    </div>
  );
  // );
}
