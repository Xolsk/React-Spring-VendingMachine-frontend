import React from "react";


export default class AdminMenu extends React.Component {

    state = { showModal: false, value: "" }
    showAdminMenu = () => {

        this.setState({ showModal: !this.state.showModal })

    }

    render() {

        return (

            <div>
                <button onClick={this.showAdminMenu} className="adminButton">AdminMenu</button>
                {this.state.showModal ?
                    <div className="modal">
                        <div className="adminMenuWrapper">
                            <div className="sections">
                                <form  >
                                    {this.props.machine.brandStock.map((brand) =>
                                        <div key={brand.brand.brandId} className="stockMenuWrapper">

                                            <label name={brand.brand.brandId}>{brand.brand.name}</label>
                                            <input brandid={brand.brand.brandId} name={brand.brand.name} price={brand.brand.price} defaultValue={brand.stock}></input>

                                        </div>
                                    )}
                                    <button disabled className="adminButton">Submit New Brand Stock</button>
                                </form>
                            </div>

                            <div className="sections">
                                <button className="adminButton" onClick={this.showAdminMenu}>Go back</button>
                            </div>

                            <div className="sections">
                                <form>

                                    {this.props.machine.coinstock.map((coin) =>
                                        <div key={coin.coin.coinId} className="stockMenuWrapper">
                                            <label name={coin.coinId}>{coin.coin.name}</label>
                                            <input name={coin.coin.name} defaultValue={coin.stock} ></input>

                                        </div>
                                    )}
                                    <div>
                                        <button disabled type="button" className="adminButton">Submit New Coin Stock</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> : null}
            </div>
        )
    }
}