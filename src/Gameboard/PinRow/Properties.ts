import { Colors } from "../../Types/Colors";

export interface Properties {
    readonly: boolean;

    current: boolean;

    pinColors: Colors[];

    hintColors: Colors[];

    onPinClick?(pinNumber: number): void;
}