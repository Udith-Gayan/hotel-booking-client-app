import React, { Fragment, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ContractService from './services/contract-service'
import HotelService from './services/hotel-service';
// const {ContractService} = require('./services/contract-service')


function App() {
  // const hotelRegObject = {type:"getAllBookings"};

  const contractService = ContractService.instance;
  const hotelService = HotelService.instance;


  const secrets = [ "snBPC56zzaJvvgnVyEf6xJn9SnFYx", "sniLKaqnd62XcFyEG6JKY4bUGwHJ1", "ssC8GupHt9K9ueFWuwwoHUYZhaVpi", "snG6EUtPvtVERiTpZmb1sBFhQEbLg"];

  /**
   * This funds seed wallet from different accounts
   */
  const fundSeedWallet = useCallback(async () => {
    await contractService.init();
    console.log('button clicked by udith');

    try {
      // const output = await contractService.requestHotelRegistration(hotelRegObject);

      const output = await hotelService.fundSeedWallet(secrets);
      console.log(output)
    } catch (error) {
      console.log(error)
    }

  }, [contractService, hotelService, secrets]);



  const handleChangeAddress = useCallback(async () => {
    await contractService.init();
    console.log('button clicked by udith');

    try {
      // const output = await contractService.requestHotelRegistration(hotelRegObject);

      const output = await hotelService.createNewUserWallet();
      console.log(output)
    } catch (error) {
      console.log(error)
    }

  }, [contractService, hotelService]);



  


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
          <br />
          <button onClick={fundSeedWallet}>Populate Seed Account</button>
        </div>
      </header>
    </div>
  );
}

export default App;
