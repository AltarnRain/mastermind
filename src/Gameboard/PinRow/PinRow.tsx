
import React, { CSSProperties } from "react";
import { Colors } from "../../Types/Colors";
import { ColorPin } from "./ColorPin/ColorPin";
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

        const colorPinStyle: CSSProperties = {
            flexDirection: "row",
            display: "flex"
        };

        const hintBoxStyle: CSSProperties = {
            display: "flex",
            justifyContent: "right"
        };

        const hintSquareBaseStyle: CSSProperties = {
            width: "15px",
            height: "15px",
            marginLeft: 5,
            marginRight: 5,
            marginTop: 11,
        };

        return (
            <div style={colorPinStyle}>
                <ColorPin onChange={this.onChange} pinNumber={1} color={this.state.pin1Color} />
                <ColorPin onChange={this.onChange} pinNumber={2} color={this.state.pin2Color} />
                <ColorPin onChange={this.onChange} pinNumber={3} color={this.state.pin3Color} />
                <ColorPin onChange={this.onChange} pinNumber={4} color={this.state.pin4Color} />

                <div style={hintBoxStyle}>
                    <div style={{...hintSquareBaseStyle, backgroundColor: "black"}} />
                    <div style={{...hintSquareBaseStyle, backgroundColor: "black"}} />
                    <div style={{...hintSquareBaseStyle, backgroundColor: "black"}} />
                    <div style={{...hintSquareBaseStyle, backgroundColor: "black"}} />
                </div>
            </div>
        );
    }

    private onChange(color: Colors, pinNumber: number): void {
        if (!this.props.readonly) {
            switch (pinNumber) {
                case 1:
                    this.setState({ pin1Color: color });
                    break;
                case 2:
                    this.setState({ pin2Color: color });
                    break;
                case 3:
                    this.setState({ pin3Color: color });
                    break;
                case 4:
                    this.setState({ pin4Color: color });
                    break;
            }
        }
    }
}