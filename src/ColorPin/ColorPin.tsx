/**
 * This component represents a single pin in the game board.
 */

import React, { CSSProperties } from "react";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { Modal } from "../Model/Model";
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

        this.state = { showColorPicker: false, color: this.props.color };

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
            backgroundColor: this.state.color,
            flexGrow: 0,
            width: "100%",
            height: "100%",
        };

        return (
            <>
                <button ref={this.buttonRef} onClick={this.onClick} style={colorPinStyle}></button>
                {
                    this.state.showColorPicker ?
                        <Modal position="center" element={this.buttonRef} widthMultiplier={3} heightMultiplier={0.5} onUserClickedOutside={this.onCloseColorPicker} workAreaRef={this.props.gameDivRef} >
                            <ColorPicker onPickColor={this.onPickColor} />
                        </Modal>
                        : null
                }
            </>
        );
    }

    private onCloseColorPicker(): void {
        this.setState({showColorPicker: false});
    }

    /**
     * Handlers the click on a pin.
     */
    private onClick(): void {
        this.setState({ showColorPicker: true });
    }

    /**
     * Used to select a color for a pin.
     * @param {PinColors} color. Preset colors.
     */
    private onPickColor(color: PinColors): void {
        if (this.props.enabled) {
            this.setState({ showColorPicker: false, color });
            if (this.props.onPickColor) {
                this.props.onPickColor(color);
            }
        }
    }
}