import ExchangeRate from "./ExchangeRate"
import { useState } from "react";
import axios from "axios";
import NewsFeed from "./NewsFeed";

const CurrencyConverter = () => {
    
    const currencies = ['BTC', 'ETH','CAD', 'XRP', 'ADA'];

    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC');
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        ExchangeRate: 0
    })
    const [result, setResult] = useState(0);

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }
        };

        axios.request(options).then((response) => {
            // console.log(response.data);
            // console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount);
            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                ExchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
            })
        }).catch((error) => {
            console.error(error);
        });
    }

  return (
      <>
    <div className="currency-converter">
      <h2>Currency Converter</h2>

      <div className="input-box">
        <table>
            <tbody>
                <tr>
                    <td>Primary Currency</td>
                    <td>
                        <input 
                            type="number" 
                            name="currency-amount-1" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} />
                    </td>
                    <td>
                        <select 
                            value={chosenPrimaryCurrency} 
                            name="currency-option-1" 
                            id=""
                            className="currency-options"
                            onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                        >
                            {currencies.map((currency, _index) => 
                            (<option key={_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Secondary Currency</td>
                    <td>
                        <input 
                            name="currency-amount-2" 
                            value={result}
                            disabled={true} />
                    </td>
                    <td>
                        <select 
                            value={chosenSecondaryCurrency} 
                            name="currency-option-2" 
                            id=""
                            className="currency-options"
                            onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                        >
                            {currencies.map((currency, _index) => 
                            (<option key={_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <button id="convert-button" onClick={convert}>Convert</button>
      </div>



      <ExchangeRate
        exchangedData = {exchangedData}>
        </ExchangeRate>

    </div>
    <NewsFeed
        currency1={exchangedData.primaryCurrency}
        currency2={exchangedData.secondaryCurrency}/>
    </>

  )
}

export default CurrencyConverter
