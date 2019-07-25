import React, { CSSProperties } from "react";
import { PinRow } from "./PinRow/PinRow";
import { State } from "./State";
export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor(props: object) {
        super(props);

        this.state = {
            move: 1,
        };

        this.onMoveDone = this.onMoveDone.bind(this);
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

        const gameRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return (
            <div style={outer}>
                <div style={gameboardStyle}>
                    {
                        gameRows.map((row, index) => <PinRow key={index} row={row} readonly={false} current={this.state.move === row} hintColors={[]} />)
                    }
                    <div style={outer}>
                        <button style={doneButtonStyle} onClick={this.onMoveDone}>Done!</button>
                    </div>
                </div>
            </div>
        );
    }

    private onMoveDone(): void {
        this.setState({ move: this.state.move + 1 });
    }
}