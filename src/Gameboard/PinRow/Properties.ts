import { Colors } from "../../Types/Colors";

export interface Properties {
    current: boolean;

    pinColors: Colors[];

    hintColors: Colors[];

    onPinClick?(pinNumber: number): void;
}