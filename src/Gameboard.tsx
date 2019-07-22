import React, { CSSProperties } from "react";
import { ColorPin } from "./ColorPin/ColorPin";
import { PinRow } from "./PinRow/PinRow";

export class GameBoard extends React.Component {

    public render(): React.ReactElement {

        const divisionStyle = {
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            flex: 1,
            height: "100%",
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
            height: "100%",
        };

        return (
            <div style={divisionStyle} >
                <div style={columnStyle}></div>
                <div style={gameboardStyle}>
                    <PinRow readonly={false} />
                </div>
                <div style={columnStyle}></div>
            </div>
        );
    }
}