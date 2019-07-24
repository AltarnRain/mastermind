import React, { CSSProperties } from "react";
import { PinRow } from "./PinRow/PinRow";
import { State } from "./State";
export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor() {
        super({});

        this.state = {
            move: 1,
        };

        this.onMoveDone = this.onMoveDone.bind(this);
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactElement {

        const divisionStyle = {
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            flex: 1,
        } as CSSProperties;

        const columnStyle = {
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            flex: 1,
        } as CSSProperties;

        const gameboardStyle: CSSProperties = {
            height: "100%",
            backgroundColor: "brown",
            flexShrink: 0,
            flexDirection: "column",
            width: "250px",
        };

        const gameRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return (
            <div style={divisionStyle} >
                <div style={columnStyle}></div>
                <div style={gameboardStyle}>
                    <div style={{ display: "flex" }}>
                        {
                            gameRows.map((row, index) => <PinRow key={index} row={row} readonly={false} current={this.state.move === row} hintColors={[]} />)
                        }
                        <button style={{ borderRadius: "40%", margin: 5, width: "100%", backgroundColor: "gray", border: 0 }} onClick={this.onMoveDone}>Done!</button>
                    </div>
                </div>
                <div style={columnStyle}></div>
            </div>
        );
    }

    private onMoveDone() {
        this.setState({ move: this.state.move + 1 });
    }
}