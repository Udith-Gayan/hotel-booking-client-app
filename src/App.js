import React, { Fragment, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import  ContractService  from './services/contract-service'
// const {ContractService} = require('./services/contract-service')


function App() {
  const hotelRegObject = {type:"getAllBookings"};
  const contractService = ContractService.instance;
  
  const handleChangeAddress = useCallback(async () => {
    await contractService.init();
    console.log('button clicked by udith');
    
    try {
      const output = await contractService.requestHotelRegistration(hotelRegObject);
      console.log(output)
    } catch (error) {
      console.log(error)
    }
    
  }, [hotelRegObject]);
  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button onClick={handleChangeAddress}>Register hotel</button>
        </div>
      </header>
    </div>
  );
}

export default App;
