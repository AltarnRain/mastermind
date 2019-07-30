/**
 * This component is a pop-up that allows the player to select a color for a clicked pin.
 */

import React, { CSSProperties } from "react";
import { allColors, Colors } from "../Types/Colors";
import { ColorPin } from "../ColorPin/ColorPin";
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
        };

        return (
            <div style={selectColorStyle} >
                {
                    allColors.map((color, index) => <ColorPin key={index} pinNumber={index} color={color} onPickColor={this.onPickColor} />)
                }
            </div>
        );
    }

    private onPickColor(color: Colors): void {
        if (this.props.onPickColor) {
            this.props.onPickColor(color);
        }
    }
}