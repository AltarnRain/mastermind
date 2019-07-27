import React, { CSSProperties } from "react";
import { allColors, Colors } from "../Types/Colors";
import { PinRow } from "./PinRow/PinRow";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor(props: object) {
        super(props);

        const allBlack: Colors[] = ["black", "black", "black", "black"];

        const hiddenColors: Colors[] = [];

        for (let i = 0; i < 4; i++) {
            const random = Math.floor(Math.random() * 4);
            hiddenColors.push(allColors[random]);
        }

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
            ],
            hiddenColors
        };

        this.onMoveDone = this.onMoveDone.bind(this);
        this.onSetColor = this.onSetColor.bind(this);
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

                            <PinRow
                                key={index}
                                current={this.state.currentRow === index}
                                row={index}
                                pinColors={row.pinColors}
                                hintColors={row.hintColors}
                                onSetColor={this.onSetColor} />
                        )
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

    private onSetColor(row: number, pinNumber: number, color: Colors): void {
        const gameRows = this.cloneGameRows();
        gameRows[row].pinColors[pinNumber] = color;

        this.setState({ gameRows });
    }

    private cloneGameRows() {
        const gameRows = [...this.state.gameRows];
        for (let i = 0; i < gameRows.length; i++) {
            gameRows[i].pinColors = [...this.state.gameRows[i].pinColors];
            gameRows[i].hintColors = [...this.state.gameRows[i].hintColors];
        }
        return gameRows;
    }
}