/**
 * This component represents a single pin in the game board.
 */

import React, { CSSProperties } from "react";
import { Properties } from "./Properties";

export class ColorPin extends React.Component<Properties> {

    /**
     * Constructs the component.
     * @param {Properties} props.
     */
    constructor(props: Properties) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactNode {

        const colorPinStyle: CSSProperties = {
            display: "flex",
            borderRadius: "50%",
            color: this.props.color,
            backgroundColor: this.props.color,
            flexGrow: 0,
            width: "14%",
            height: "88%",
            marginTop: "1%",
            marginRight: "1%"
        };

        return (
            <button onClick={this.onClick} style={colorPinStyle}></button>
        );
    }

    /**
     * Handlers the click on a pin.
     */
    private onClick(): void {
        if (this.props.onPinClick) {
            this.props.onPinClick(this.props.pinNumber);
        }

        if (this.props.onPickColor) {
            this.props.onPickColor(this.props.color);
        }
    }
}