/**
 * This component is a pop-up that allows the player to select a color for a clicked pin.
 */

import React, { CSSProperties } from "react";
import { ColorPin } from "../ColorPin/ColorPin";
import { pinColors, PinColors } from "../Types/PinColors";
import { Properties } from "./Properties";

export class SelectColor extends React.Component<Properties> {

    /**
     * Constructs the component
     * @param {Properties} props.
     */
    constructor(props: Properties) {
        super(props);

        this.onPickColor = this.onPickColor.bind(this);
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement {

        const selectColorStyle: CSSProperties = {
            display: "flex",
            flexDirection : "row",
            backgroundColor: "white",
            height: "100%"
        };

        return (
            <div style={selectColorStyle} >
                {
                    pinColors.map((color, index) => <ColorPin key={index} pinNumber={index} color={color} onPickColor={this.onPickColor} />)
                }
            </div>
        );
    }

    private onPickColor(color: PinColors): void {
        if (this.props.onPickColor) {
            this.props.onPickColor(color);
        }
    }
}