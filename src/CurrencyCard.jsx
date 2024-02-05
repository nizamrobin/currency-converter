import { useCallback, useEffect, useRef, useState } from "react";

export default function CurrencyCard({
  currencyDB,
  currencyId,
  currencyName,
  currencySymbol,
  exchangeValue,
  handleCurrency,
  handleValue,
  className,
  classes,
}) {
  // To fix the uncontrolled behavior of input field. (if no value is set, the input field behaves like uncontrolled. To avoid this, exchangeValue is set to state and placed in use effect so that when the exchangeValue props will be available the val is updated)
  const [val, setVal] = useState(exchangeValue);
  useEffect(() => {
    // console.log(exchangeValue);
    setVal(exchangeValue);
    // setWidth(ref);
  }, [exchangeValue]);

  // set currency data and return exchangeId depending on the selection of option of currency list
  const currencyFeedback = useCallback(
    (e) => {
      // setWidth(e);
      e.target.style.width = e.target.value.length * 7 + 60 + "px";
      currencyDB.map((item) => {
        if (e.target.value == item.name) {
          handleCurrency(item.code, item.name, item.symbol_native);
        }
      });
    },
    [currencyDB, handleCurrency]
  );

  return (
    // currencyData !== null && (
    <div
      className={`currencyCard p-4 rounded-2xl shadow-xl shadow-slate-200 flex flex-col bg-white my-4 ${className} ${classes}`}
    >
      <div className="header flex justify-between p-1 font-bold">
        <h3>{currencyId}</h3>

        <select
          className="bg-transparent"
          id={currencyId}
          value={currencyName}
          onChange={currencyFeedback}
          // ref={ref}
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
        <span className="text-2xl mr-1">{currencySymbol}</span>
        {/* {currencyData && ( */}
        <input
          id={currencyId}
          type="number"
          className="text-5xl w-1/2"
          value={val}
          maxLength={2}
          onChange={(e) => {
            handleValue(e.currentTarget.id, e.currentTarget.value);
          }}
        />
        {/* )} */}
      </div>
    </div>
  );
}
