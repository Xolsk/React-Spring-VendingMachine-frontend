import React from "react";


export default class InfoDisplay extends React.Component {


    render() {


        return (
            <div className="infoDisplay">
                <h1>
                {this.props.activeMessage}
                </h1>
            </div>
        )
    }
}
