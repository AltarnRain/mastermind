/**
 * Gameboard component. This is where the action happens.
 */

import React, { CSSProperties } from "react";
import { PinRow } from "../PinRow/PinRow";
import { allColors, Colors } from "../Types/Colors";
import { GameRow } from "./GameRow";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor(props: object) {
        super(props);

        const hiddenColors: Colors[] = [];

        for (let i = 0; i < 4; i++) {
            const random = Math.floor(Math.random() * 4);
            hiddenColors.push(allColors[random]);
        }

        const gameRows: GameRow[] = []; 
        for (let i = 0; i < 10; i++) {
            gameRows.push({hintColors: ["black", "black", "black", "black"], pinColors: ["black", "black", "black", "black"]});
        }

        this.state = {
            currentRow: 0,
            gameRows,
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

    /**
     * Event handler for when the player click the "Done" button. This moves the game to the next row.
     */
    private onMoveDone(): void {
        this.setState({ currentRow: this.state.currentRow + 1 });
    }

    /**
     * Event handler for setting the color of a pin in a row.
     * @param {number} row. The row of the pin,
     * @param {number} pinNumber. Pin number in the row.
     * @param {Colors} color. The color the pin will get.
     */
    private onSetColor(row: number, pinNumber: number, color: Colors): void {
        const gameRows = this.cloneGameRows();
        gameRows[row].pinColors[pinNumber] = color;

        this.setState({ gameRows });
    }

    /**
     * Creates a new array of game rows and hint colors so we don't have to update the state directly.
     */
    private cloneGameRows() {
        const gameRows = [...this.state.gameRows];
        for (let i = 0; i < gameRows.length; i++) {
            gameRows[i].pinColors = [...this.state.gameRows[i].pinColors];
            gameRows[i].hintColors = [...this.state.gameRows[i].hintColors];
        }
        return gameRows;
    }
}