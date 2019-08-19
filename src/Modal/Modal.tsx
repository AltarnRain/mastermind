/**
 * Generic Modal component.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Properties } from "./Properties";

export class Modal extends React.Component<Properties> {

    /**
     * portal anchor.
     */
    private portalAnchor: HTMLDivElement;

    /**
     * Root node for the modal.
     */
    private modalRoot: HTMLElement | null;

    constructor(props: Properties) {
        super(props);
        this.portalAnchor = document.createElement("div");
        this.modalRoot = document.getElementById("portalRoot");

        this.onClick = this.onClick.bind(this);
    }

    public componentDidMount() {
        if (this.modalRoot) {
            this.modalRoot.appendChild(this.portalAnchor);
        }

        document.addEventListener("mousedown", this.onClick);
    }

    public componentWillUnmount() {
        if (this.modalRoot) {
            this.modalRoot.removeChild(this.portalAnchor);
        }

        document.removeEventListener("mousedown", this.onClick);
    }

    public render() {

        let left = 0;
        let top = 0;
        let width = 0;
        let height = 0;

        if (this.props.element.current) {
            const rectangle = this.props.element.current.getBoundingClientRect();
            left = rectangle.left;
            top = rectangle.bottom;
            width = rectangle.width;
            height = rectangle.height;

            if (typeof this.props.widthMultiplier !== "undefined") {
                width = width * this.props.widthMultiplier;
            }

            if (typeof this.props.heightMultiplier !== "undefined") {
                height = height * this.props.heightMultiplier;
            }

            if (typeof this.props.position) {
                if (this.props.position === "center") {
                    const centerPosition = left + rectangle.width / 2;
                    left = (centerPosition - width / 2);
                }
            }

            if (this.props.workAreaRef && this.props.workAreaRef.current) {
                const workAreaRectangle = this.props.workAreaRef.current.getBoundingClientRect();
                if (left < workAreaRectangle.left) {
                    left = workAreaRectangle.left;
                }
            }

        }

        const modelStyle: React.CSSProperties = {
            position: "absolute",
            display: "flex",
            left,
            top,
            height,
            width,
            flexDirection: "column",
            boxSizing: "border-box",
        };

        return ReactDOM.createPortal(
            <div style={modelStyle}>
                {
                    this.props.children
                }
            </div>,
            this.portalAnchor,
        );
    }

    /**
     * Event that is fired whenever the user clicks the mouse.
     * @param {MouseEvent} e. The event object from the mouse click
     */
    private onClick(e: MouseEvent): void {
        if (this.modalRoot && this.props.onUserClickedOutside) {

            const target = e.target as Element;

            // If the target's ID is 'modal' then this element is part of the pop-up and the 'onUserClickedOutside' should not be fired.
            if (target && target.id !== "modal") {
                this.props.onUserClickedOutside();
            }
        }
    }
}