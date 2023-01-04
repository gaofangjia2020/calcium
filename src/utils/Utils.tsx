import { NumberType } from "../types";

export default class Utils {
    public static getElem<E extends HTMLElement = HTMLElement>(id: string): E {
        return document.getElementById(id) as E ?? document.body;
    }

    public static numberTypeToStr(type: NumberType): string {
        switch(type) {
            case NumberType.HEX:
                return "hex";
            case NumberType.DEC:
                return "dec";
            case NumberType.OCT:
                return "oct";
            case NumberType.BIN:
                return "bin";
        }
    }

    public static getPixelRatio(ctx: any): number {
        var backingStore = ctx.backingStorePixelRatio ||
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }

    public static arrayRemove<T = any>(oldArray: T[], index: number): T[] {
        if(index < 0 || index >= oldArray.length) return [];
        var newArray = oldArray;

        var j = index;
        while(j < newArray.length) {
            newArray[j] = newArray[j + 1];
            j++;
        }
        newArray.pop();

        return newArray;
    }

    public static arrayPut<T = any>(oldArray: T[], index: number, item: T): T[] {
        if(index < 0 || index >= oldArray.length + 1) return [];
        var newArray = oldArray;

        newArray.splice(index, 0, item);
        return newArray;
    }

    public static isAllowedSymbol(symbol: string): boolean {
        const blocked = [
            "Tab", "CapsLock", "Shift", "Control", "Alt", "Meta", "ContextMenu",
            "Insert", "Home", "PageUp", "PageDown", "End", "Delete",
            "\\", "`", "@", "#", "$", "&", ";", ":", "\"",
            "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
        ];

        return !(blocked.indexOf(symbol) > -1);
    }

    public static isAllowedProgrammingSymbol(symbol: string): boolean {
        const allowed = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
            "A", "B", "C", "D", "E", "F",
            "+", "-", "*", "/", "<", ">", "%",
            "Backspace", "ArrowLeft", "ArrowRight"
        ];

        return allowed.indexOf(symbol) > -1;
    }

    // If directly get the offsetLeft of an elem, it may be a wrong value like 0
    // And a recursion can solve this
    public static getOffsetLeft(elem: HTMLElement): number {
        var offset = elem.offsetLeft;
        if(elem.offsetParent) offset += Utils.getOffsetLeft(elem.offsetParent as HTMLElement);
        return offset;
    }
}
