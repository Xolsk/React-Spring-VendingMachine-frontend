import React from "react";
import AdminMenu from "./AdminMenu";

export default class CoinsSlot extends React.Component {

    dragOver = (event) => {
        event.preventDefault();
    }

    render() {


        return (
            <div className="coinSlotUI">

                <h1>INSERT COIN</h1>
                <div onDrop={this.props.dragCoin}
                    onDragOver={this.dragOver} className="coinSlot"
                >
                </div>
                <div className="amountDisplay">
                    {this.props.currentValue}
                </div>
                <button className="returnButton" onClick={this.props.returnMoney}>
                    Return Money
                </button>
                <AdminMenu machine={this.props.machine}/>
            </div>
        )
    }
}