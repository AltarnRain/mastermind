/**
 * Represents a row on the game boards
 */

import { HintColors } from "../Types/HintColors";
import { PinColors } from "../Types/PinColors";
export interface GameRow {
    /**
     * The colors of each pin in the game row.
     */
    pinColors: PinColors[];

    /**
     * The colors of each hint box.
     */
    hintColors: HintColors[];
}