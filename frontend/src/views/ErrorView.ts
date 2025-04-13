import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

export class ErrorView {
    private rootElement: HTMLElement
    
    private titleHeading: HTMLHeadingElement = document.createElement('h1')
    private messageHeading: HTMLHeadingElement = document.createElement('h2')

    private localizableElements: LocalizableElement[] = [
        { element: this.titleHeading, key: "Error" },
    ]

    constructor(rootElement: HTMLElement, message: string) {
        this.rootElement = rootElement
        this.initializeView()
        this.localizableElements.push(
            { element: this.messageHeading, key: message },
        )
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''

        this.rootElement.appendChild(this.titleHeading)
        this.rootElement.appendChild(this.messageHeading)
    }
}