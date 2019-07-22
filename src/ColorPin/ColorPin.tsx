import React, { CSSProperties } from "react";
import { Properties } from "./Properties";

export class ColorPin extends React.Component<Properties> {

    public render(): React.ReactNode {

        const colorPinStyle: CSSProperties = {
            borderRadius: "50%",
            color: this.props.color,
            backgroundColor: this.props.color,
            borderBlockStart: this.props.color,
            flexGrow: 0,
            width:  this.props.color === "black" ? "15px" : "30px",
            height: this.props.color === "black" ? "15px" : "30px",
            margin: this.props.color === "black" ? 20 : 5,
        };

        return (
            <button style={colorPinStyle}></button>
        );
    }
}