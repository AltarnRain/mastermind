import React, { CSSProperties } from "react";
import { Colors } from "../Types/Colors";
import { PinRow } from "./PinRow/PinRow";
import { State } from "./State";

export class GameBoard extends React.Component<{}, State> {

    /**
     * Constructs the Gameboard
     */
    constructor(props: object) {
        super(props);

        const allBlack: Colors[] = ["black", "black", "black", "black"];

        this.state = {
            move: 1,
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
                            readonly={false}
                            current={this.state.move === index + 1}
                            pinColors={row.pinColors}
                            hintColors={row.hintColors} />)
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

    private onPinClick(pinNumber: number): void {
        // no implementation
    }
}