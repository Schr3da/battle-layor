import * as React from "react";

import { Game } from "./Game";

export class CanvasWrapper extends React.Component<{}, {}> {

    private wrapperRef: Element | null = null;
    private game: Game | null = null;

    public componentDidMount() {
        this.game = new Game(this.wrapperRef!);
        console.log(this.game!);
    }

    public render() {
        return <div ref={(r) => this.wrapperRef = r} className="canvas-wrapper"></div>
    }

}
