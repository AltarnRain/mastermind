
/**
 * Select Color Properties
 */

import { PinColors } from "../Types/PinColors";

export interface Properties {

    /**
     * An event hander to handle the selection of a color.
     * @param {PinColors} color.
     */
    onPickColor?(color: PinColors): void;
}