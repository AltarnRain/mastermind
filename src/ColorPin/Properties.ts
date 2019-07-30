/**
 * Color pin properties
 */

import { Colors } from "../Types/Colors";

export interface Properties {

    /**
     * The color of the pin.
     */
    color: Colors;

    /**
     * The pinNumber. This is the locartion of this pin in a row or when selecting a color for a pin.
     */
    pinNumber: number;

    /**
     * An event fired when the users selects a pin in a row.
     * @param {number} pinNumber. The location of the pin in a row.
     */
    onPinClick?(pinNumber: number): void;

    /**
     * An event fired when the user selects a color of a pin.
     * @param {Colors} color. One of the defined colors for the game.
     */
    onPickColor?(color: Colors): void;
}