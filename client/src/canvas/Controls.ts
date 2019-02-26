
const Keys = {
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Space: 32,
}

export class Control {
    
    private pressed: {[key: number]: boolean}; 

    constructor() {
        this.pressed = {};
    }
}
