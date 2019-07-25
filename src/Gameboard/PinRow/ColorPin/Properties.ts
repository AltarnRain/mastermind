import { Colors } from "../../../Types/Colors";

/**
 * Color pin properties
 */
export interface Properties {
    color: Colors;

    pinNumber: number;

    onPinClick?(pinNumber: number): void;
}