
/**
 * Select Color Properties
 */

import { Colors } from "../../Types/Colors";

export interface Properties {
    onPickColor?(color: Colors): void;
}