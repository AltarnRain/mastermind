import React, { CSSProperties } from "react";
import { PinColors } from "../Types/PinColors";
import { Properties } from "./Properties";
import { State } from "./State";
import { ColorPin } from "../ColorPin/ColorPin";
import { Modal } from "../Model/Model";
import { SelectColor } from "../SelectColor/SelectColor";

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
            <div style={colorPinStyle} ref={this.rowRef} >
                {
                    this.props.pinColors.map((color, index) => <ColorPin key={index} pinNumber={index} color={color} onPinClick={this.onPinClick} />)
                }
                {
                     this.state.showPinPicker ?
                     <Modal element={this.rowRef}>
                         <SelectColor onPickColor={this.onPickColor} />
                     </Modal>
                     : null
                }

                <div style={hintBoxStyle}>
                    {
                        this.props.hintColors.map((color, index) => <div key={index} style={{ ...hintSquareBaseStyle, backgroundColor: color }} />)
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
            this.setState({showPinPicker: true, currentPinNumber: pinNumber});
        }
    }

    /**
     * Used to select a color for a pin.
     * @param {PinColors} color. Preset colors.
     */
    private onPickColor(color: PinColors): void {
        if (this.props.current && this.props.onSetColor && typeof(this.state.currentPinNumber) === "number") {
            this.setState({showPinPicker: false});
            this.props.onSetColor(this.props.row, this.state.currentPinNumber, color);
        }
    }
}