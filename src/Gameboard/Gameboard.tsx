import React, { CSSProperties, RefObject } from "react";
import reactDom from "react-dom";
import { Colors } from "../Types/Colors";
import { PinRow } from "./PinRow/PinRow";
import { SelectColor } from "./SelectColor/SelectColor";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    private pinRowRefs: Array<RefObject<HTMLDivElement>> = [];

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

        for (let i = 0; i < this.state.gameRows.length; i++) {
            this.pinRowRefs.push(React.createRef());
        }

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
                        this.state.gameRows.map((row, index) =>
                            <div ref={this.pinRowRefs[index]} >
                                <PinRow
                                    key={index}
                                    current={this.state.currentRow === index}
                                    pinColors={row.pinColors}
                                    hintColors={row.hintColors}
                                    onPinClick={this.onPinClick} />
                            </div>)
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

        const currentRef = this.pinRowRefs[this.state.currentRow];

        if (currentRef.current) {
            reactDom.createPortal(<SelectColor onPickColor={this.onPickColor} />, currentRef.current);

        }
    }

    private onPickColor(color: Colors): void {

    }
}