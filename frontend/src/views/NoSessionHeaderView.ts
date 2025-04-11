import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

export class NoSessionHeaderView {
    private rootElement: HTMLElement
    
    private infoParagraph: HTMLParagraphElement = document.createElement('p')
    private signInButton: HTMLButtonElement = document.createElement('button')
    private nameInput: HTMLInputElement = document.createElement('input')
    private passInput: HTMLInputElement = document.createElement('input')

    private localizableElements: LocalizableElement[] = [
        { element: this.infoParagraph, key: "No session" },
        { element: this.signInButton, key: "Sign In" },
        { element: this.nameInput, key: "Enter name" },
        { element: this.passInput, key: "Enter pass" },
    ]

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''

        this.rootElement.append(this.infoParagraph)
        this.rootElement.append(this.nameInput)
        this.rootElement.append(this.passInput)
        this.rootElement.append(this.signInButton)
    }
}
