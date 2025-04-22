import * as ElementIds from "../constants/element-ids"
import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"

type SignOutCallback = () => void
type CommitNameChangeCallback = (name: string) => void

export class WithSessionHeaderView {
    private rootElement: HTMLElement

    private playerNameParagraph: HTMLParagraphElement = document.createElement('p')
    private signOutButton: HTMLButtonElement = document.createElement('button')
    private changePlayerName: HTMLButtonElement = document.createElement('button')
    private commitPlayerNameChange: HTMLButtonElement = document.createElement('button')
    private playerNameInput: HTMLInputElement = document.createElement('input')
    private statusParagraph: HTMLParagraphElement = document.createElement('p')

    private playerName: string
    private signOutCallback: SignOutCallback | null = null
    private commitNameChangeCallback: CommitNameChangeCallback | null = null

    private localizableElements: LocalizableElement[] = [
        { element: this.signOutButton, key: "Sign Out" },
        { element: this.changePlayerName, key: "Change Name" },
        { element: this.commitPlayerNameChange, key: "Commit Name Change" },
        { element: this.playerNameInput, key: "Enter name" },
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
        this.rootElement.appendChild(this.changePlayerName)
        this.rootElement.appendChild(this.signOutButton)
        this.rootElement.appendChild(this.statusParagraph)

        this.playerNameParagraph.textContent = this.playerName
        this.playerNameParagraph.id = ElementIds.PLAYER_DISPLAY_NAME_ID
        
        this.statusParagraph.id = ElementIds.WITH_SESSION_STATUS_ID

        this.playerNameInput.type = 'text'
        this.playerNameInput.id = ElementIds.PLAYER_DISPLAY_NAME_INPUT_ID

        this.signOutButton.addEventListener('click', () => {
            this.signOutCallback?.()
        })

        this.changePlayerName.addEventListener('click', () => {
            this.rootElement.insertBefore(this.commitPlayerNameChange, this.signOutButton)
            this.rootElement.insertBefore(this.playerNameInput, this.commitPlayerNameChange)
            this.rootElement.removeChild(this.playerNameParagraph)
            this.rootElement.removeChild(this.changePlayerName)
        })

        this.commitPlayerNameChange.addEventListener('click', () => {
            const name = this.playerNameInput.value
            if (name.length == 0) {
                return
            } 
            this.rootElement.insertBefore(this.changePlayerName, this.signOutButton)
            this.rootElement.insertBefore(this.playerNameParagraph, this.changePlayerName)
            this.rootElement.removeChild(this.commitPlayerNameChange)
            this.rootElement.removeChild(this.playerNameInput)
            this.playerNameParagraph.textContent = name
            this.commitNameChangeCallback?.(name)
        })
    }

    setSignOutCallback(value: SignOutCallback | null): WithSessionHeaderView {
        this.signOutCallback = value
        return this
    }

    setCommitNameChangeCallback(value: CommitNameChangeCallback | null): WithSessionHeaderView {
        this.commitNameChangeCallback = value
        return this
    }
}
