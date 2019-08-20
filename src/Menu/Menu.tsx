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
                <p style={{fontSize: 24}} >Menu</p>
                <button style={{...buttonStyle, backgroundColor: "green"}} onClick={this.onClose}>Back to current game</button>
                <p>Game options</p>
                <button style={{...buttonStyle, backgroundColor: "red"}} onClick={this.onEndGame}>Give up</button>
                <p>Bug reporting</p>
                <button style={{...buttonStyle, backgroundColor: "cyan"}} onClick={this.onReportIssueGithub}>Report issue (requires Github account)</button>
                <button style={{...buttonStyle, backgroundColor: "cyan"}} onClick={this.onReportIssueMail}>Mail issue</button>
                <p>Debugging options</p>
                <button style={{...buttonStyle, backgroundColor: "purple"}} onClick={this.onCodeToConsole}>Show code</button>
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
    private onReportIssueGithub(): void {
        window.open("https://github.com/AltarnRain/mastermind/issues/new");
    }

    /**
     * Open the URL for reporting issues in a new tab
     */
    private onReportIssueMail(): void {
        window.location.href = "mailto:onno.invernizzi@gmail.com";
    }

    /**
     * The user wants to see the code in the console.
     */
    private onCodeToConsole(): void {
        if (this.props.onCodeToConsole) {
            this.props.onCodeToConsole();
        }
    }
}