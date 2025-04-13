import * as ElementIds from "../constants/element-ids"
import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

export type SignInCallback = (name: string, pass: string) => void
export type SignUpCallback = (name: string, pass: string) => void

export class NoSessionHeaderView {
    private rootElement: HTMLElement
    
    private statusParagraph: HTMLParagraphElement = document.createElement('p')
    private signInButton: HTMLButtonElement = document.createElement('button')
    private signUpButton: HTMLButtonElement = document.createElement('button')
    private nameInput: HTMLInputElement = document.createElement('input')
    private passInput: HTMLInputElement = document.createElement('input')

    private signInCallback: SignInCallback | null = null
    private signUpCallback: SignUpCallback | null = null

    private localizableElements: LocalizableElement[] = [
        { element: this.signInButton, key: "Sign In" },
        { element: this.signUpButton, key: "Sign Up" },
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

        this.rootElement.append(this.nameInput)
        this.rootElement.append(this.passInput)
        this.rootElement.append(this.signUpButton)
        this.rootElement.append(this.signInButton)
        this.rootElement.append(this.statusParagraph)

        this.statusParagraph.id = ElementIds.NO_SESSION_STATUS_ID
        this.nameInput.type = 'text'
        this.passInput.type = 'password'

        this.signInButton.addEventListener('click', () => {
            const name = this.nameInput.value
            const pass = this.passInput.value
            if (name.length > 0 && pass.length > 0) {
                this.signInCallback?.(name, pass)
            }
        })

        this.signUpButton.addEventListener('click', () => {
            const name = this.nameInput.value
            const pass = this.passInput.value
            if (name.length > 0 && pass.length > 0) {
                this.signUpCallback?.(name, pass)
            }
        })
    }

    setSignInCallback(value: SignInCallback | null): NoSessionHeaderView {
        this.signInCallback = value
        return this
    }

    setSignUpCallback(value: SignUpCallback | null): NoSessionHeaderView {
        this.signUpCallback = value
        return this
    }
}
