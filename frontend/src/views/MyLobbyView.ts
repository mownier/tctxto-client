import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

export class MyLobbyView {
    private rootElement: HTMLElement

    private titleHeading: HTMLHeadingElement = document.createElement('h1')

    private localizableElements: LocalizableElement[] = [
        { element: this.titleHeading, key: "My Lobby" }
    ]

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''

        this.rootElement.appendChild(this.titleHeading)
    }
}