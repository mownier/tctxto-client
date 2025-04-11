import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

export class WelcomeView {
    private rootElement: HTMLElement

    private titleHeading: HTMLHeadingElement = document.createElement('h1')

    private localizableElements: LocalizableElement[] = [
        { element: this.titleHeading, key: "Welcome" },
    ]

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView() {
        this.rootElement.innerHTML = ''

        this.rootElement.appendChild(this.titleHeading)
    }
}