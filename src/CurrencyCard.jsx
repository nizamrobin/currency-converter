import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

const CurrencyCard = forwardRef(function CurrencyCard(
  {
    currencyDB,
    currencyId,
    currencyName,
    currencySymbol,
    exchangeValue,
    handleCurrency,
    handleValue,
    classes,
  },
  ref
) {
  // To fix the uncontrolled behavior of input field. (if no value is set, the input field behaves like uncontrolled. To avoid this, exchangeValue is set to state and placed in use effect so that when the exchangeValue props will be available the val is updated)
  const [val, setVal] = useState(exchangeValue);
  useEffect(() => {
    // console.log(exchangeValue);
    setVal(exchangeValue);
  }, [exchangeValue]);

  // set currency data and return exchangeId depending on the selection of option of currency list
  const currencyFeedback = useCallback(
    (e) => {
      currencyDB.map((item) => {
        if (e.target.value == item.name) {
          handleCurrency(item.code, item.name, item.symbol);
        }
      });
    },
    [currencyDB, handleCurrency]
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
          onChange={currencyFeedback}
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
        <span className="text-2xl">{currencySymbol}</span>
        {/* {currencyData && ( */}
        <input
          ref={ref}
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
});
// export default function CurrencyCard({
//   currencyDB,
//   currencyId,
//   currencyName,
//   currencySymbol,
//   exchangeValue,
//   handleCurrency,
//   handleValue,
//   classes,
// }) {

//   // );
// }
export default CurrencyCard;
