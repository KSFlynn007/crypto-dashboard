const ExchangeRate = ({ExchangeRate, chosenPrimaryCurrency, chosenSecondaryCurrency}) => {
  return (
    <div className="exchange-rate">
        <h3>Exchange Rate</h3>
        <h1>{ExchangeRate}</h1>
        <p>{chosenPrimaryCurrency} to {chosenSecondaryCurrency}</p>
    </div>

  )
}

export default ExchangeRate
