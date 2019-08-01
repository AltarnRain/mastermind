/**
 * Main app. The game board is launched from here.
 */

import React, { CSSProperties } from "react";
import "./App.css";
import { GameBoard } from "./Gameboard/Gameboard";

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
      <div>
        <p style={titleStyle}>Mastermind</p>
        <GameBoard />
      </div>
    );
  }
}
