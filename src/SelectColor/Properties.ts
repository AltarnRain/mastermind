
/**
 * Select Color Properties
 */

import { Colors } from "../Types/Colors";

export interface Properties {

    /**
     * An event hander to handle the selection of a color.
     * @param {Colors} color.
     */
    onPickColor?(color: Colors): void;
}