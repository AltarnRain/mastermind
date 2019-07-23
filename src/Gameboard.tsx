import React, { CSSProperties } from "react";
import { PinRow } from "./PinRow/PinRow";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    /**
     *
     */
    constructor() {
        super({});

        this.state = {
            row: 1,
        };
    }

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
            ...columnStyle,
            backgroundColor: "brown",
            flexShrink: 0,
            flexDirection: "column",
        };

        const gameRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return (
            <div style={divisionStyle} >
                <div style={columnStyle}></div>
                <div style={gameboardStyle}>
                    {
                        gameRows.map((row, index) => <PinRow key={index} current={this.state.row === row} row={row} readonly={false} />)
                    }
                </div>
                <div style={columnStyle}></div>
            </div>
        );
    }
}