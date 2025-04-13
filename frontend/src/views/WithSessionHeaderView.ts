import * as ElementIds from "../constants/element-ids"
import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

type SignOutCallback = () => void

export class WithSessionHeaderView {
    private rootElement: HTMLElement

    private playerNameParagraph: HTMLParagraphElement = document.createElement('p')
    private signOutButton: HTMLButtonElement = document.createElement('button')
    private statusParagraph: HTMLParagraphElement = document.createElement('p')

    private playerName: string
    private signOutCallback: SignOutCallback | null = null

    private localizableElements: LocalizableElement[] = [
        { element: this.signOutButton, key: "Sign Out" },
    ]

    constructor(rootElement: HTMLElement, playerName: string) {
        this.rootElement = rootElement
        this.playerName = playerName

        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''
        
        this.rootElement.appendChild(this.playerNameParagraph)
        this.rootElement.appendChild(this.signOutButton)
        this.rootElement.appendChild(this.statusParagraph)

        this.playerNameParagraph.textContent = this.playerName
        this.playerNameParagraph.id = ElementIds.PLAYER_DISPLAY_NAME_ID
        
        this.statusParagraph.id = ElementIds.WITH_SESSION_STATUS_ID

        this.signOutButton.addEventListener('click', () => {
            this.signOutCallback?.()
        })
    }

    setSignOutCallback(value: SignOutCallback | null): WithSessionHeaderView {
        this.signOutCallback = value
        return this
    }
}
