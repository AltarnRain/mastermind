import { Colors } from "../../Types/Colors";

export interface Properties {
    readonly: boolean;

    row: number;

    current: boolean;

    hintColors: Colors[];
}