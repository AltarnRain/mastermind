/**
 * This component represents a single pin in the game board.
 */

import React, { CSSProperties } from "react";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { Modal } from "../Modal/Modal";
import { PinColors } from "../Types/PinColors";
import { Properties } from "./Properties";
import { State } from "./State";

export class ColorPin extends React.Component<Properties, State> {

    private buttonRef = React.createRef<HTMLButtonElement>();

    /**
     * Constructs the component.
     * @param {Properties} props.
     */
    constructor(props: Properties) {
        super(props);

        this.state = { showColorPicker: false };

        this.onClick = this.onClick.bind(this);
        this.onPickColor = this.onPickColor.bind(this);
        this.onCloseColorPicker = this.onCloseColorPicker.bind(this);
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
            width: "100%",
            height: "100%",
        };

        return (
            <>
                <button ref={this.buttonRef} onClick={this.onClick} style={colorPinStyle}></button>
                {
                    this.state.showColorPicker ?
                        <Modal position="center" element={this.buttonRef} widthMultiplier={4.5} heightMultiplier={0.7} onUserClickedOutside={this.onCloseColorPicker} workAreaRef={this.props.gameDivRef} >
                            <ColorPicker onPickColor={this.onPickColor} />
                        </Modal>
                        : null
                }
            </>
        );
    }

    private onCloseColorPicker(): void {
        this.setState({ showColorPicker: false });
    }

    /**
     * Handlers the click on a pin.
     */
    private onClick(): void {
        if (this.props.enabled) {
            this.setState({ showColorPicker: true });
        }
    }

    /**
     * Used to select a color for a pin.
     * @param {PinColors} color. Preset colors.
     */
    private onPickColor(color: PinColors): void {
        this.setState({ showColorPicker: false });
        if (this.props.onSetColor) {
            this.props.onSetColor(this.props.pinNumber, color);
        }
    }
}