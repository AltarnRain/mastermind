/**
 * Side panel component
 */

import React, { CSSProperties } from "react";
import { Properties} from "./Properties";

export class Menu extends React.Component<Properties> {

    /**
     * Constructs the component.
     */
    constructor(props: Properties) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onEndGame = this.onEndGame.bind(this);
        this.onCodeToConsole = this.onCodeToConsole.bind(this);
    }

    /**
     * Renders the component.
     */

    public render(): React.ReactNode {

        const buttonStyle: CSSProperties = {
            margin: "5%",
            width: "100%"
        };

        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>Menu</p>
                <button style={buttonStyle} onClick={this.onEndGame}>Give up</button>
                <button style={buttonStyle} onClick={this.onReportIssue}>Report issue</button>
                <button style={buttonStyle} onClick={this.onCodeToConsole}>Show code in console</button>
                <button style={buttonStyle} onClick={this.onClose}>Close</button>
            </div>
        );
    }

    /**
     * Close the menu
     */
    private onClose(): void {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    /**
     * Ends the game.
     */
    private onEndGame(): void {
        if (this.props.onEndGame) {
            this.props.onEndGame();
        }
    }

    /**
     * Open the URL for reporting issues in a new tab
     */
    private onReportIssue(): void {
        window.open("https://github.com/AltarnRain/mastermind/issues/new");
    }

    private onCodeToConsole(): void {
        if (this.props.onCodeToConsole) {
            this.props.onCodeToConsole();
        }
    }
}