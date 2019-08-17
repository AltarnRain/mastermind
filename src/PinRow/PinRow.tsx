import React, { CSSProperties } from "react";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { ColorPin } from "../ColorPin/ColorPin";
import { Modal } from "../Model/Model";
import { PinColors } from "../Types/PinColors";
import { Properties } from "./Properties";
import { State } from "./State";

export class PinRow extends React.Component<Properties, State> {

    private rowRef = React.createRef<HTMLDivElement>();

    /**
     * Contructor
     * @param {Properties} properties
     */
    constructor(props: Properties) {
        super(props);

        this.state = {
            showPinPicker: false,
        };

        this.onPinClick = this.onPinClick.bind(this);
        this.onPickColor = this.onPickColor.bind(this);
    }

    public render(): React.ReactNode {

        const colorPinStyle: CSSProperties = {
            flexDirection: "row",
            display: "flex",
            backgroundColor: typeof (this.props.current) !== "undefined" ? this.props.current ? "blue" : "brown" : undefined,
            height: "8%",
        };

        const hintBoxStyle: CSSProperties = {
            display: "flex",
            justifyContent: "right",
            height: "100%",
            flexGrow: 1,
        };

        const hintSquareBaseStyle: CSSProperties = {
            width: "80%",
            height: "65%",
            marginTop: "6%",
            marginRight: "2%"
        };

        return (
            <div style={colorPinStyle} ref={this.rowRef} >
                {
                    this.props.pinColors.map((color, index) => (
                        <div key={index} style={{ display: "flex", width: "14%", height: "88%", marginTop: "1%" }}>
                            <ColorPin pinNumber={index} color={color} onPinClick={this.onPinClick} />
                        </div>
                    ))
                }
                {
                    this.state.showPinPicker ?
                        <Modal element={this.rowRef}>
                            <ColorPicker onPickColor={this.onPickColor} />
                        </Modal>
                        : null
                }

                <div style={hintBoxStyle}>
                    {
                        typeof (this.props.hintColors) !== "undefined" ?
                            this.props.hintColors.map((color, index) => <div key={index} style={{ ...hintSquareBaseStyle, backgroundColor: color }} />)
                            : null
                    }
                </div>
            </div>
        );
    }

    /**
     * An event fired when the user clicks on a pin in a pin row. Used to set the color of a pin.
     * @param {number} pinNumber. The location of a pin in a row.
     */
    private onPinClick(pinNumber: number): void {
        if (this.props.current && this.props.onSetColor) {
            this.setState({ showPinPicker: true, currentPinNumber: pinNumber });
        }
    }

    /**
     * Used to select a color for a pin.
     * @param {PinColors} color. Preset colors.
     */
    private onPickColor(color: PinColors): void {
        if (this.props.current && this.props.onSetColor && typeof (this.state.currentPinNumber) === "number") {
            this.setState({ showPinPicker: false });

            if (typeof (this.props.row) !== "undefined") {
                this.props.onSetColor(this.props.row, this.state.currentPinNumber, color);
            }
        }
    }
}