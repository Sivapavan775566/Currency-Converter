
import { useEffect, useState } from 'react';
import './App.css';
import Currencydata from './Currencydata';
import axios from "axios";
import {format} from "date-fns"


function App() {
  const [amountOne, setamountOne] = useState(1);
  const [amountTwo, setamountTwo] = useState(1);
  const [currencyOne, setcurrencyOne] = useState("USD");
  const [currencyTwo, setcurrencyTwo] = useState("INR");
  const [currencyRates, setCurrencyRates] = useState([]);

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
      params: {
        from: 'USD',
        to: 'EUR,GBP'
      },
      headers: {
        'X-RapidAPI-Key': '46183441d4msh56982946d9c81f6p1a6924jsne9e6de87af70',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
      }
    };
    try {
      const fetchData = async () => {
        const response = await axios.request(options);
        console.log(response.data);
        setCurrencyRates(response.data.rates); // Assuming that the response data is an object
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [])

  const handleAmountOneChange = (amountOne) => {
    setamountTwo(amountOne * currencyRates[currencyTwo] / currencyRates[currencyOne]);
    setamountOne(amountOne);
  }
  const handleAmountTwoChange = (amountTwo) => {
    setamountOne(amountTwo * currencyRates[currencyOne] / currencyRates[currencyTwo]);
    setamountTwo(amountTwo);
  }
  const handleCurrencyOneChange = (currencyOne) => {
    setamountTwo(amountOne * currencyRates[currencyTwo] / currencyRates[currencyOne]);
    setcurrencyOne(currencyOne);
  }
  const handleCurrencyTwoChange = (currencyTwo) => {
    setamountOne(amountTwo * currencyRates[currencyOne] / currencyRates[currencyTwo]);
    setcurrencyTwo(currencyTwo);
  }


  return (
    <div className='header' >
      <center >
      <h1>CurrencyConverter $</h1>
      <h2 >
        1 {currencyOne}  Equals
      </h2>

      <h2 >
        {amountTwo / amountOne} {currencyTwo}
      </h2>
      <h3 >
        {format(new Date(), "dd/MM/yyyy h:mm")}
      </h3>
      <Currencydata
        amount={amountOne}
        currency={currencyOne}
        curencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
      /><br/>
      <Currencydata amount={amountTwo}
        currency={currencyTwo}
        curencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
      />
      </center>
    </div>
  );
}

export default App;
