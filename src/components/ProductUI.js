import React from "react";


export default class ProductUI extends React.Component {




    makeSelection = (brand) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/vendingMachines/13/purchase/${brand}`, requestOptions)
            .then(response => response.json())
            .then(result => this.handleSucessFullPurchase(result))
            .catch(error => console.log(error));
    }



    handleSucessFullPurchase = (purchase) => {
    
        let composedMessage = ""
        if (purchase.object != null) {
            composedMessage = `You have received a delicious ${purchase.object.name}`;
            this.props.handleStock(purchase.object,purchase.stock);
            this.props.resetCurrentValue();
        }
        else {
            composedMessage = purchase.message;
        }
        
        this.props.getNewMessage(composedMessage);
        
    }

    render() {

        return (
            <div className="productUI">
                {this.props.brandStock.map((brand) =>
                    <div key={brand.brand.brandId} className="brandWrapper"
                        onClick={() => { this.makeSelection(brand.brand.brandId) }}>
                        <div className="brandElement">
                            {brand.brand.name}
                        </div>
                        <div className="brandElement">
                            {brand.brand.price}
                        </div >
                        {brand.stock!=0 ?
                            <div className="inStock"></div>
                            :
                            <div className="outOfStock"></div>}
                    </div>
                )}
            </div>
        )
    }
}

