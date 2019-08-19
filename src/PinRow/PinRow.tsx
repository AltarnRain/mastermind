import React, { CSSProperties } from "react";
import { ColorPin } from "../ColorPin/ColorPin";
import { Properties } from "./Properties";

export class PinRow extends React.Component<Properties> {
    public render(): React.ReactNode {

        const colorPinStyle: CSSProperties = {
            flexDirection: "row",
            display: "flex",
            backgroundColor: typeof (this.props.current) !== "undefined" ? this.props.current ? "blue" : "brown" : undefined,
            height: "8%",
        };

        const hintBoxStyle: CSSProperties = {
            display: "flex",
            justifyContent: "right",
            height: "100%",
            flexGrow: 1,
        };

        const hintSquareBaseStyle: CSSProperties = {
            width: "80%",
            height: "65%",
            marginTop: "6%",
            marginRight: "2%"
        };

        return (
            <div style={colorPinStyle}>
                {
                    this.props.pinColors.map((color, index) => (
                        <div key={index} style={{ display: "flex", width: "14%", height: "88%", marginTop: "1%" }}>
                            <ColorPin enabled={this.props.current} pinNumber={index} color={color} gameDivRef={this.props.gameDivRef} />
                        </div>
                    ))
                }
                <div style={hintBoxStyle}>
                    {
                        typeof (this.props.hintColors) !== "undefined" ?
                            this.props.hintColors.map((color, index) => <div key={index} style={{ ...hintSquareBaseStyle, backgroundColor: color }} />)
                            : null
                    }
                </div>
            </div>
        );
    }
}