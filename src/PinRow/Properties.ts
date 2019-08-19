/**
 * Properties of a pin row.
 */

import { HintColors } from "../Types/HintColors";
import { PinColors } from "../Types/PinColors";

export interface Properties {

    gameDivRef: React.RefObject<HTMLDivElement>;

    /**
     * True if this row is the current row.
     */
    current: boolean;

    /**
     * The colors of this row.
     */
    pinColors: PinColors[];

    /**
     * The hint colors of this row.
     */
    hintColors?: HintColors[];

    /**
     * This row's nunmber
     */
    row?: number;

    /**
     * Event handler for setting a color for a pin.
     * @param {number} row. The row of the game board.
     * @param {number} pinNumber. The number of the pin in the row.
     * @param {PinColors} color. The color of the pin.
     */
    onSetColor?(row: number, pinNumber: number, pinColor: PinColors): void;
}