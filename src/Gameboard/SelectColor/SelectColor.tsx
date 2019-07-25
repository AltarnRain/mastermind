import React from "react";
import { Colors } from "../../Types/Colors";
import { ColorPin } from "../PinRow/ColorPin/ColorPin";
import { Properties } from "./Properties";

export class SelectColor extends React.Component<Properties> {

    /**
     *
     */
    constructor(props: Properties) {
        super(props);
    }

    public render(): React.ReactElement {

        return (
            <div>
                <ColorPin pinNumber={1} color="black" onPinClick={this.onPickColor} />
                <ColorPin pinNumber={2} color="blue" />
                <ColorPin pinNumber={3} color="red" />
                <ColorPin pinNumber={4} color="white" />
                <ColorPin pinNumber={5} color="yellow" />
            </div>
        );
    }

    private onPickColor(pinNumber: number, color: Colors): void {
        if (this.props.onPickColor) {
            this.props.onPickColor(color);
        }
    }
}