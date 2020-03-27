import React from "react";
import Coin from "./Coin";
import CoinSlot from "./CoinSlot";

export default class CoinsUI extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            coinList: []
        };
    }

    componentDidMount() {

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/coins/", requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ coinList: result }))
            .catch(error => console.log('error', error));

    }

    addCoin = (coin) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(coin);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/vendingMachines/13/insertCoin/", requestOptions)
            .then(response => response.json())
            .then((result => {
                this.props.setCurrentValue(result.object);
                this.props.getNewMessage(result.message)
            }))
            .catch(error => console.log(error));
    }

    dragCoin = (event) => {

        const coinStringed = event.dataTransfer.getData("drag-item");
        const coin = JSON.parse(coinStringed);
        this.addCoin(coin);
    }

    returnMoney = () => {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/vendingMachines/13/returnMoney", requestOptions)
            .then(response => response.text())
            .then((result => { this.props.getNewMessage(result); this.props.resetCurrentValue(); }))
            .catch(error => console.log('error', error));

    }

    render() {

        return (
            <div className="coinUI">
                <div className="coinSelector">
                    <h1>Drag us to the Coin Slot</h1>
                    <div className="coins">

                        {this.state.coinList.map((coin) =>
                            <div key={coin.coinId} className="coinWrapper">
                                <Coin
                                    coinProperties={coin}
                                />
                                <button onClick={() => { this.addCoin(coin) }}
                                    className="Button">Click to Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <CoinSlot
                    machine={this.props.machine}
                    returnMoney={this.returnMoney}
                    dragCoin={this.dragCoin}
                    currentValue={this.props.currentValue}
                />
            </div>
        )
    }
}