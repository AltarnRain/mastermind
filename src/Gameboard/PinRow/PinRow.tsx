
import React, { CSSProperties } from "react";
import { ColorPin } from "./ColorPin/ColorPin";
import { Properties } from "./Properties";

export class PinRow extends React.Component<Properties> {

    /**
     * Contructor
     * @param {Properties} properties
     */
    constructor(props: Properties) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    public render(): React.ReactNode {

        const colorPinStyle: CSSProperties = {
            flexDirection: "row",
            display: "flex",
            backgroundColor: this.props.current ? "blue" : "brown"
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
            marginTop: 10,
        };

        return (
            <div style={colorPinStyle}>
                <ColorPin onPinClick={this.onClick} pinNumber={1} color={this.props.pinColors[0]} />
                <ColorPin onPinClick={this.onClick} pinNumber={2} color={this.props.pinColors[1]} />
                <ColorPin onPinClick={this.onClick} pinNumber={3} color={this.props.pinColors[2]} />
                <ColorPin onPinClick={this.onClick} pinNumber={4} color={this.props.pinColors[3]} />

                <div style={hintBoxStyle}>
                    <div style={{ ...hintSquareBaseStyle, backgroundColor: this.props.hintColors[0] }} />
                    <div style={{ ...hintSquareBaseStyle, backgroundColor: this.props.hintColors[1] }} />
                    <div style={{ ...hintSquareBaseStyle, backgroundColor: this.props.hintColors[2] }} />
                    <div style={{ ...hintSquareBaseStyle, backgroundColor: this.props.hintColors[3] }} />
                </div>
            </div>
        );
    }

    private onClick(pinNumber: number): void {
        if (!this.props.readonly && this.props.onPinClick) {
            this.props.onPinClick(pinNumber);
        }
    }
}