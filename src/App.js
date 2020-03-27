import React from 'react';
import CoinUI from "./components/CoinUI";
import InfoDisplay from "./components/InfoDisplay";
import ProductUI from "./components/ProductUI";
import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeMessage: "Welcome",
      vendingMachine: { brandStock: [] },
      currentValue: 0
    }
    this.getNewMessage = this.getNewMessage.bind(this);
    this.resetCurrentValue = this.resetCurrentValue.bind(this);
    this.setCurrentValue = this.setCurrentValue.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }

  resetCurrentValue() {

    this.setState({ currentValue: 0 })
  }

  setCurrentValue(newValue) {

    this.setState({ currentValue: newValue });
  }

  getNewMessage(message) {

    this.setState({ activeMessage: message });
    setTimeout(() => { this.setState({ activeMessage: `Welcome to ${this.state.vendingMachine.model}` }) }, 3000)
  }

  componentDidMount() {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/vendingMachines/13", requestOptions)
      .then(response => response.json())
      .then(result => this.setState({ currentValue: result.insertedCoinValue, vendingMachine: result, activeMessage: `Welcome to ${result.model}` }))
      .catch(error => console.log('error', error));
  }

  handleStock(reference, newStock){
    
    const stock= this.state.vendingMachine.brandStock;
    const foundBrand =stock.find((brand)=>brand.brand.brandId==reference.brandId);
    foundBrand.stock=newStock;
    stock[foundBrand.brandId]=foundBrand;
    const machine=this.state.vendingMachine;
    machine.brandStock=stock;
    this.setState({machine});

  }


  render() {

    return (

      <div className="App">
        <div className="mainUI">
          <CoinUI
            setCurrentValue={this.setCurrentValue}
            resetCurrentValue={this.resetCurrentValue}
            currentValue={this.state.currentValue}
            getNewMessage={this.getNewMessage}
            machine={this.state.vendingMachine}
          />
          <ProductUI
            resetCurrentValue={this.resetCurrentValue}
            brandStock={this.state.vendingMachine.brandStock}
            handleStock={this.handleStock}
            getNewMessage={this.getNewMessage} />
        </div>
        <InfoDisplay
          activeMessage={this.state.activeMessage}
          vendingMachine={this.state.vendingMachine} />
      </div>

    );
  }
}

