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
            display: "flex",
            borderRadius: "50%",
            color: this.props.color,
            backgroundColor: this.props.color,
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
        if (this.props.onPinClick) {
            this.props.onPinClick(this.props.pinNumber);
        }
    }
}