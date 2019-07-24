
import React from "react";
import { Properties } from "./Properties";

export class Hint extends React.Component<Properties> {

    public render(): React.ReactElement {
        return (
            <div>
                <div style={{ backgroundColor: this.props.hint1Color }}></div>
                <div style={{ backgroundColor: this.props.hint2Color }}></div>
                <div style={{ backgroundColor: this.props.hint3Color }}></div>
                <div style={{ backgroundColor: this.props.hint4Color }}></div>
            </div>
        );
    }
}