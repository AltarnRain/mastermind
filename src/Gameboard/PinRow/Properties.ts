import { Colors } from "../../Types/Colors";

export interface Properties {
    current: boolean;

    pinColors: Colors[];

    hintColors: Colors[];

    row: number;

    onSetColor?(row: number, pinNumber: number, color: Colors): void;
}