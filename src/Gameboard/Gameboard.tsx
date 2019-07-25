import React, { CSSProperties } from "react";
import reactDom from "react-dom";
import { Colors } from "../Types/Colors";
import { PinRow } from "./PinRow/PinRow";
import { SelectColor } from "./SelectColor/SelectColor";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor(props: object) {
        super(props);

        const allBlack: Colors[] = ["black", "black", "black", "black"];

        this.state = {
            currentRow: 0,
            gameRows: [
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
                { hintColors: [...allBlack], pinColors: [...allBlack] },
            ]
        };

        this.onMoveDone = this.onMoveDone.bind(this);
        this.onPinClick = this.onPinClick.bind(this);
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactElement {

        const outer: CSSProperties = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        };

        const gameboardStyle: CSSProperties = {
            height: "100%",
            backgroundColor: "brown",
            flexShrink: 0,
            flexDirection: "column",
            width: "250px",
        };

        const doneButtonStyle: CSSProperties = {
            borderRadius: "40%",
            width: "90%",
            backgroundColor: "gray",
            border: 5,
            margin: 5,
        };

        return (
            <div style={outer}>
                <div style={gameboardStyle}>
                    {
                        this.state.gameRows.map((row, index) => <PinRow
                            key={index}
                            current={this.state.currentRow === index}
                            pinColors={row.pinColors}
                            hintColors={row.hintColors}
                            onPinClick={this.onPinClick} />)
                    }
                    <div style={outer}>
                        <button style={doneButtonStyle} onClick={this.onMoveDone}>Done!</button>
                    </div>
                </div>
            </div>
        );
    }

    private onMoveDone(): void {
        this.setState({ currentRow: this.state.currentRow + 1 });
    }

    private onPinClick(pinNumber: number): void {

        const portalElement = document.getElementById("portal");

        if (portalElement) {
            reactDom.createPortal(<SelectColor onPickColor={this.onPickColor} />, portalElement);
        }
    }

    private onPickColor(color: Colors): void {
        // no implementation
    }
}