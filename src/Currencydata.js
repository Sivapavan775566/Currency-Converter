import React from 'react';
import './Currencydata.css';

const Currencydata = ({amount,currency,curencies,onAmountChange,onCurrencyChange}) => {
  return (
    <div>
      
      <input value={amount} onChange={(e)=>onAmountChange(e.target.value)}/>
      <select value={currency} onChange={(e)=>onCurrencyChange(e.target.value)}>
        {
            curencies.map((curency,index)=>(
            <option key={index} value={curency}>{curency}</option>
            ))
        }
        
      </select>
    </div>
  );
}

export default Currencydata;
