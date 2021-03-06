/**
 * Main app. The game board is launched from here.
 */

import React, { CSSProperties } from "react";
import { GameBoard } from "../Gameboard/Gameboard";

export class Main extends React.Component {

    /**
     * Render the component.
     */
    public render(): React.ReactElement {
        const titleStyle: CSSProperties = {
            fontSize: 28,
            marginBottom: 10,
            textAlign: "center",
        };

        return (
            <div style={{ height: "95vh", textAlign: "center" }} >
                <p style={titleStyle}>Mastermind</p>
                <GameBoard />
            </div>
        );
    }
}
