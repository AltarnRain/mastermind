/**
 * This component is a pop-up that allows the player to select a color for a clicked pin.
 */

import React, { CSSProperties } from "react";
import { pinColors, PinColors } from "../Types/PinColors";
import { Properties } from "./Properties";

export class SelectColor extends React.Component<Properties> {

    /**
     * Constructs the component
     * @param {Properties} props.
     */
    constructor(props: Properties) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement {

        const selectColorStyle: CSSProperties = {
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            height: "100%",
            justifyContent: "space-evenly"
        };

        return (
            <div style={selectColorStyle} >
                {
                    pinColors.map((color, index) => <div key={index} onClick={this.onClick} style={{ height: "100%", width: "100%", backgroundColor: color }} ></div>)
                }
            </div>
        );
    }

    /**
     * Handles the click on a colored div element
     * @param {React.SyntheticEvent<HTMLDivElement>} e. The event object
     */
    private onClick(e: React.SyntheticEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement;

        if (this.props.onPickColor) {
            this.props.onPickColor(target.style.backgroundColor as PinColors);
        }
    }
}