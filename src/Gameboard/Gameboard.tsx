/**
 * Gameboard component. This is where the action happens.
 */

import React, { CSSProperties } from "react";
import { ColorPin } from "../ColorPin/ColorPin";
import { HintProvider, randomizeArray } from "../HelperFunctions";
import { PinRow } from "../PinRow/PinRow";
import { HintColors } from "../Types/HintColors";
import { pinColors, PinColors } from "../Types/PinColors";
import { GameRow } from "./GameRow";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    private gameDivRef = React.createRef<HTMLDivElement>();

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
            width: "100%",
        };

        const gameboardStyle: CSSProperties = {
            backgroundColor: "brown",
            flexShrink: 0,
            flexDirection: "column",
            width: "50vh"
        };

        const doneButtonStyle: CSSProperties = {
            display: "flex-inline",
            borderRadius: "40%",
            width: "50%",
            height: "3%",
            backgroundColor: "gray",
            border: "1%",
            margin: "1%",
            fontWeight: "bold",
            alignItems: "center"
        };

        const gameEndTextStype: CSSProperties = {
            display: "flex",
            fontSize: 28,
            marginBottom: 10,
            marginTop: 50,
            textAlign: "center",
            height: "100%",
            flexDirection: "column"
        };

        const playAgainButtonStyle: CSSProperties = {
            margin: "5%",
            height: "8%",
            fontSize: "24px",
            fontWeight: "bold",
            borderRadius: "50%",
        };

        const codeStyle: CSSProperties = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "50vh",
            height: "12%"
        };

        return (
            <div style={outer}>
                {
                    <div ref={this.gameDivRef} style={gameboardStyle}>
                        {
                            this.state.gameRows.map((row, index) =>

                                <PinRow
                                    key={index}
                                    current={this.state.currentRow === index}
                                    row={index}
                                    pinColors={row.pinColors}
                                    hintColors={row.hintColors}
                                    onSetColor={this.onSetColor}
                                    gameDivRef={this.gameDivRef}
                                />
                            )}
                        {
                            this.state.gameLost ?
                                <div style={gameEndTextStype}>
                                    <p>You lost the game. The code was...</p><br />
                                    <div style={codeStyle}>
                                        <ColorPin enabled={false} pinNumber={0} color={this.state.codeColors[0]} />
                                        <ColorPin enabled={false} pinNumber={1} color={this.state.codeColors[1]} />
                                        <ColorPin enabled={false} pinNumber={2} color={this.state.codeColors[2]} />
                                        <ColorPin enabled={false} pinNumber={3} color={this.state.codeColors[3]} />
                                    </div>
                                    <button style={playAgainButtonStyle} onClick={this.onResetBoard}>Play again?</button>
                                </div>
                                : this.state.gameWon ?
                                    <div style={gameEndTextStype}>
                                        <p>You found the code!</p>
                                        <div style={codeStyle}>
                                            <ColorPin enabled={false} pinNumber={0} color={this.state.codeColors[0]} />
                                            <ColorPin enabled={false} pinNumber={1} color={this.state.codeColors[1]} />
                                            <ColorPin enabled={false} pinNumber={2} color={this.state.codeColors[2]} />
                                            <ColorPin enabled={false} pinNumber={3} color={this.state.codeColors[3]} />
                                        </div>
                                        <p>Congratulations!</p>
                                        <button style={playAgainButtonStyle} onClick={this.onResetBoard}>Play again?</button>
                                    </div>
                                    : null
                        }
                        <div style={outer}>
                            {this.allColorsSet() ?
                                <button style={doneButtonStyle} onClick={this.onMoveDone}>Done!</button>
                                : null
                            }
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

        return codeColors;
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

        // We'll provide two hints as per the rules of Mastermind. The right color in the right position is will be a red hint.
        // The rigth color in the wrong position will be a white pin.

        const hints = HintProvider(currentGameRow.pinColors, this.state.codeColors);

        if (hints.rightColorRightPosition === 4) {
            this.setState({ gameWon: true });
            return;
        }

        if (this.state.currentRow === 11 && hints.rightColorRightPosition !== 4) {
            this.setState({ gameLost: true });
            return;
        }

        const rightColorRightPositionColors: HintColors[] = [];
        const rightColorWrongPositionColors: HintColors[] = [];

        for (let i = 0; i < hints.rightColorRightPosition; i++) {
            rightColorRightPositionColors.push("red");
        }

        for (let i = 0; i < hints.rightColorWrongPosition; i++) {
            rightColorWrongPositionColors.push("white");
        }

        const remainingSlots = 4 - (hints.rightColorRightPosition + hints.rightColorWrongPosition);

        const hintColors = [...randomizeArray(rightColorRightPositionColors), ...randomizeArray(rightColorWrongPositionColors)];

        for (let i = 0; i < remainingSlots; i++) {
            hintColors.push("black");
        }

        currentGameRow.hintColors = hintColors;

        this.setState({ currentRow: this.state.currentRow + 1, gameRows: newBoardState });
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
            showMenu: false
        };
    }

    /**
     * Creates a new array of game rows and hint colors so we don't have to update the state directly.
     * @returns {GameRow[]}
     */
    private cloneGameRows(): GameRow[] {
        const gameRows = [...this.state.gameRows];
        for (let i = 0; i < gameRows.length; i++) {
            gameRows[i].pinColors = [...this.state.gameRows[i].pinColors];
            gameRows[i].hintColors = [...this.state.gameRows[i].hintColors];
        }
        return gameRows;
    }

    /**
     * Check if all colors are set.
     * @returns {boolean}. True when all colors of the current row are not black.
     */
    private allColorsSet(): boolean {
        return this.state.gameRows[this.state.currentRow].pinColors.filter((color) => color === "black").length === 0;
    }
}