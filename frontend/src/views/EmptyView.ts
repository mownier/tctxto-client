export class EmptytView {
    private rootElement: HTMLElement

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''
    }
}
