import React from "react";


export default class Coin extends React.Component {


    startDrag = (event) => {

        const coin = JSON.stringify(this.props.coinProperties);
        event.dataTransfer.setData("drag-item", coin);
    }

    render() {

        return (

            <div draggable
                onDragStart={this.startDrag}
                className={"coin " + this.props.coinProperties.size}
            >
                <div className="coinContent">
                    {this.props.coinProperties.name}
                </div>
                
            </div>
        )
    }
}