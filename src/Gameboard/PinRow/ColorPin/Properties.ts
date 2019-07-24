import { Colors } from "../../../Types/Colors";

/**
 * Color pin properties
 */
export interface Properties {
    color: Colors;

    pinNumber: number;

    onChange?(color: Colors, pinNumber: number): void;
}