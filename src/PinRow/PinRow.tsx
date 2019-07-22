
import React from "react";
import { ColorPin } from "../ColorPin/ColorPin";
import { Colors } from "../Types/Colors";
import { Properties } from "./Properties";
import { State } from "./State";

export class PinRow extends React.Component<Properties, State> {

    /**
     * Contructor
     * @param {Properties} properties
     */
    constructor(props: Properties) {
        super(props);

        this.state = {
            pin1Color: "black",
            pin2Color: "black",
            pin3Color: "black",
            pin4Color: "black",
        };

        this.onChange = this.onChange.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <ColorPin onChange={this.onChange} pinNumber={1} color={this.state.pin1Color} />
                <ColorPin onChange={this.onChange} pinNumber={2} color={this.state.pin2Color} />
                <ColorPin onChange={this.onChange} pinNumber={3} color={this.state.pin3Color} />
                <ColorPin onChange={this.onChange} pinNumber={3} color={this.state.pin4Color} />
            </div>
        );
    }

    private onChange(color: Colors, pinNumber: number): void {
        if (this.props.readonly) {
            return;
        }
    }
}