/**
 * Color pin properties
 */

import { PinColors } from "../Types/PinColors";

export interface Properties {

    gameDivRef?: React.RefObject<HTMLDivElement>;

    /**
     * The color of the pin.
     */
    color: PinColors;

    /**
     * The pinNumber. This is the locartion of this pin in a row or when selecting a color for a pin.
     */
    pinNumber: number;

    /**
     * When true, handle clicks.
     */
    enabled: boolean;

    /**
     * An event fired when the users selects a pin in a row.
     * @param {number} pinNumber. The location of the pin in a row.
     */
    onPinClick?(pinNumber: number): void;

    /**
     * An event fired when the user selects a color of a pin.
     * @param {PinColors} color. One of the defined colors for the game.
     */
    onSetColor?(pinNumber: number, color: PinColors): void;
}