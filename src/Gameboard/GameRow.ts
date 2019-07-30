/**
 * Represents a row on the game boards
 */

import { Colors } from "../Types/Colors";
export interface GameRow {
    /**
     * The colors of each pin in the game row.
     */
    pinColors: Colors[];

    /**
     * The colors of each hint box.
     */
    hintColors: Colors[];
}