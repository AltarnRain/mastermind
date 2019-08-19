/**
 * Side panel component
 */

import React from "react";
import { Properties} from "./Properties";

export class Menu extends React.Component<Properties> {

    /**
     *
     */
    constructor(props: Properties) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }
    public render() {
        return (
            <>
                <span><p>Hello menu.</p></span>
                <button onClick={this.onClose}>Close</button>
            </>
        );
    }

    /**
     * Close the menu
     */
    private onClose(): void {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}