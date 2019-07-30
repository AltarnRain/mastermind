/**
 * Properties of a pin row.
 */

import { Colors } from "../Types/Colors";

export interface Properties {

    /**
     * True if this row is the current row.
     */
    current: boolean;

    /**
     * The colors of this row.
     */
    pinColors: Colors[];

    /**
     * The hint colors of this row.
     */
    hintColors: Colors[];

    /**
     * This row's nunmber
     */
    row: number;

    /**
     * Event handler for setting a color for a pin.
     * @param {number} row. The row of the game board.
     * @param pinNumber.
     * @param color 
     */
    onSetColor?(row: number, pinNumber: number, color: Colors): void;
}