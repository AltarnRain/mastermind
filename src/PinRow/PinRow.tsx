import React, { CSSProperties } from "react";
import { ColorPin } from "../ColorPin/ColorPin";
import { Modal } from "../Modal/Modal";
import { PinColors } from "../Types/PinColors";
import { Properties } from "./Properties";

export class PinRow extends React.Component<Properties> {

    private rowRef = React.createRef<HTMLDivElement>();

    /**
     * Constructs the component.
     */
    constructor(props: Properties) {
        super(props);

        this.onSetColor = this.onSetColor.bind(this);
        this.onMoveDone = this.onMoveDone.bind(this);
    }

    /**
     * Renders the component.
     */
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

        const doneButtonStyle: CSSProperties = {
            display: "flex-inline",
            borderRadius: "40%",
            width: "100%",
            height: "100%",
            backgroundColor: "gray",
            fontWeight: "bold",
            fontSize: 25,
            alignItems: "center"
        };

        return (
            <div ref={this.rowRef} style={colorPinStyle}>
                {
                    this.props.pinColors.map((color, index) => (
                        <div key={index} style={{ display: "flex", width: "14%", height: "88%", marginTop: "1%" }}>
                            <ColorPin enabled={this.props.current} pinNumber={index} color={color} gameDivRef={this.props.gameDivRef} onSetColor={this.onSetColor} />
                        </div>
                    ))
                }
                <div style={hintBoxStyle}>
                    {
                        typeof (this.props.hintColors) !== "undefined" ?
                            this.props.hintColors.map((color, index) => <div key={index} style={{ ...hintSquareBaseStyle, backgroundColor: color }} />)
                            : null
                    }
                </div>
                {
                    this.allColorsSet() && this.props.current ?
                        <Modal element={this.rowRef}>
                            <div style={{ height: "50%" }}>
                                <button style={doneButtonStyle} onClick={this.onMoveDone}>Done!</button>
                            </div>
                        </Modal>
                        : null
                }
            </div>
        );
    }

    /**
     * Check if all colors are set.
     * @returns {boolean}. True when all colors of the current row are not black.
     */
    private allColorsSet(): boolean {
        return this.props.pinColors.filter((color) => color === "black").length === 0;
    }

    private onMoveDone(): void {
        if (this.props.onMoveDone) {
            this.props.onMoveDone();
        }
    }

    private onSetColor(pinNunber: number, color: PinColors): void {
        if (this.props.onSetColor && typeof this.props.row !== "undefined") {
            this.props.onSetColor(this.props.row, pinNunber, color);
        }
    }
}