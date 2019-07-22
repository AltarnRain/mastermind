import React, { CSSProperties } from "react";
import "./App.css";
import { GameBoard } from "./Gameboard";

export class Main extends React.Component {

  public render(): React.ReactElement {
    const titleStyle: CSSProperties = {
      fontSize: 28,
      marginBottom: 10,
      textAlign: "center",
    };

    return (
      <div style={{height: "90vh"}}>
        <p style={titleStyle}>Welcome to MasterMind</p>
        <GameBoard />
      </div>
    );
  }
}
