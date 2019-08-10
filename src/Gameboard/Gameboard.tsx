/**
 * Gameboard component. This is where the action happens.
 */

import React, { CSSProperties } from "react";
import { PinRow } from "../PinRow/PinRow";
import { HintColors } from "../Types/HintColors";
import { pinColors, PinColors } from "../Types/PinColors";
import { GameRow } from "./GameRow";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor(props: object) {
        super(props);

        this.state = this.getInitialState();

        this.onMoveDone = this.onMoveDone.bind(this);
        this.onSetColor = this.onSetColor.bind(this);
        this.onResetBoard = this.onResetBoard.bind(this);
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactElement {

        const outer: CSSProperties = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "90%",
            width: "100%"
        };

        const gameboardStyle: CSSProperties = {
            backgroundColor: "brown",
            flexShrink: 0,
            flexDirection: "column",
            width: "50vh"
        };

        const doneButtonStyle: CSSProperties = {
            borderRadius: "40%",
            width: "90%",
            height: "3%",
            backgroundColor: "gray",
            border: "1%",
            margin: "1%",
        };

        const titleStyle: CSSProperties = {
            fontSize: 28,
            marginBottom: 10,
            textAlign: "center",
        };

        return (
            <div style={outer}>
                {
                    this.state.gameLost ?
                        <div style={titleStyle}>
                            <p>You lost the game. The code was...</p>
                            <PinRow pinColors={this.state.codeColors} />
                            <button onClick={this.onResetBoard}>Play again?</button>
                        </div>
                        :
                        this.state.gameWon ?
                            <div style={titleStyle}>
                                <p>You won the game</p>
                                <button onClick={this.onResetBoard}>Play again?</button>
                            </div>
                            :
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
                }
            </div>
        );
    }

    /**
     * Returns an array of empty game rows.
     * @returns {GameRow[]}. Returns 12 empty game rows
     */
    private getGameEmptyRows(): GameRow[] {

        const gameRows: GameRow[] = [];
        for (let i = 0; i < 12; i++) {
            gameRows.push({ hintColors: ["black", "black", "black", "black"], pinColors: ["black", "black", "black", "black"] });
        }

        return gameRows;
    }

    /**
     * Returns 4 randomly selected colors.
     * @param {PinColors[]}. An array with 4 randomly selected colors.
     */
    private getCode(): PinColors[] {
        const codeColors: PinColors[] = [];

        for (let i = 0; i < 4; i++) {
            const random = Math.floor(Math.random() * 6);
            codeColors.push(pinColors[random]);
        }

        return ["orange", "yellow", "purple", "orange"];
    }

    /**
     * Event handler for when the player click the "Done" button. This moves the game to the next row.
     */
    private onMoveDone(): void {

        if (this.state.gameWon || this.state.gameLost) {
            return;
        }

        // Clone the current board so to work immutable.
        const newBoardState = this.cloneGameRows();

        // Get the curerent game row.
        const currentGameRow = newBoardState[this.state.currentRow];

        // This are the colors the player selected.
        const guessColor = currentGameRow.pinColors;

        // Create a new array with the location of the code colors and the color.
        let codeColorsToCheck = this.state.codeColors.map((color, index) => {
            return { index, color };
        });

        // We'll provide two hints as per the rules of Mastermind. The right color in the right position is will be a red hint.
        // The rigth color in the wrong position will be a white pin.
        let rightColorWrongPosition = 0;
        let rightColorRightPosition = 0;

        // First check if the player gussed colors in the right position.
        for (let i = 0; i < currentGameRow.pinColors.length; i++) {
            const guessedColor = guessColor[i];
            const codeColor = codeColorsToCheck.filter((c) => c.index === i);

            if (codeColor.length > 0) {
                if (guessedColor === codeColor[0].color) {
                    rightColorRightPosition++;

                    // The hint is done. Remove this element so it is not given as 'Right Color Wrong Position' hint.
                    codeColorsToCheck = codeColorsToCheck.filter((c) => c.index !== i);
                }
            }
        }

        // Check for any correct colors in the wrong position. Any colors that were in the right position
        // have been removed from the codeColorsToCheck array.
        for (let i = 0; i < currentGameRow.pinColors.length; i++) {
            const guessedColor = guessColor[i];
            // Not the right position, but this color might be present in the code.
            const exists = codeColorsToCheck.filter((c) => c.color === guessedColor);

            if (exists.length > 0) {
                rightColorWrongPosition++;

                // The hint is done. Remove this element from the colors to check array.
                codeColorsToCheck = codeColorsToCheck.filter((c) => c.index !== exists[0].index);
            }
        }

        if (rightColorRightPosition === 4) {
            this.setState({ gameWon: true });
            return;
        }

        if (this.state.currentRow === 11 && rightColorRightPosition !== 4) {
            this.setState({ gameLost: true });
            return;
        }

        const rightColorRightPositionColors: HintColors[] = [];
        const rightColorWrongPositionColors: HintColors[] = [];

        for (let i = 0; i < rightColorRightPosition; i++) {
            rightColorRightPositionColors.push("red");
        }

        for (let i = 0; i < rightColorWrongPosition; i++) {
            rightColorWrongPositionColors.push("white");
        }

        const remainingSlots = 4 - (rightColorRightPosition + rightColorWrongPosition);

        // Loop ten times and swam two random elements in the hintColor array.
        // This will make life harder for the player and it is permitted by the rules of Mastermind.
        const hintColors = [...this.randomizeArray(rightColorRightPositionColors), ...this.randomizeArray(rightColorWrongPositionColors)];

        for (let i = 0; i < remainingSlots; i++) {
            hintColors.push("black");
        }

        currentGameRow.hintColors = hintColors;

        this.setState({ currentRow: this.state.currentRow + 1, gameRows: newBoardState });
    }

    private randomizeArray(hintColorArray: HintColors[]): HintColors[] {

        const newArray = [...hintColorArray];
        for (let i = 0; i < 10; i++) {
            const pos1 = Math.floor(Math.random() * 4);
            const pos2 = Math.floor(Math.random() * 4);
            const pos1Color = newArray[pos1];
            const pos2Color = newArray[pos2];
            newArray[pos1] = pos2Color;
            newArray[pos2] = pos1Color;
        }

        return newArray;
    }

    /**
     * Event handler for setting the color of a pin in a row.
     * @param {number} row. The row of the pin,
     * @param {number} pinNumber. Pin number in the row.
     * @param {PinColors} color. The color the pin will get.
     */
    private onSetColor(row: number, pinNumber: number, color: PinColors): void {
        const gameRows = this.cloneGameRows();
        gameRows[row].pinColors[pinNumber] = color;

        this.setState({ gameRows });
    }

    /**
     * Resets the game board.
     */
    private onResetBoard(): void {
        this.setState(this.getInitialState);
    }

    /**
     * Gets the initial state of the game.
     */
    private getInitialState(): State {
        return {
            currentRow: 0,
            gameRows: this.getGameEmptyRows(),
            codeColors: this.getCode(),
            gameLost: false,
            gameWon: false,
        };
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