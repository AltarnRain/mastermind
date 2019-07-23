import React, { CSSProperties } from "react";
import { Properties } from "./Properties";

export class ColorPin extends React.Component<Properties> {

    /**
     *
     */
    constructor(props: Properties) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    public render(): React.ReactNode {

        const colorPinStyle: CSSProperties = {
            borderRadius: "50%",
            color: this.props.color,
            backgroundColor: this.props.color,
            borderWidth: this.props.color === "black" ? 5 : 5,
            flexGrow: 0,
            width: "30px",
            height: "30px",
            margin: 5,
        };

        return (
            <button onClick={this.onClick} style={colorPinStyle}></button>
        );
    }
    private onClick(event: React.SyntheticEvent) {
        if (this.props.onChange) {
            this.props.onChange("red", this.props.pinNumber);
        }
    }
}