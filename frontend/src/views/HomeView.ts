import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

export type JoinLobbyCallback = (lobbyId: string) => void
export type CreateLobbyCallback = (lobbyName: string) => void

export class HomeView {
    private rootElement: HTMLElement

    private titleHeading: HTMLHeadingElement = document.createElement('h1')
    private joinLobbyButton: HTMLButtonElement = document.createElement('button')
    private joinLobbyIdInput: HTMLInputElement = document.createElement('input')
    private createLobbyButton: HTMLButtonElement = document.createElement('button')
    private createLobbyNameInput: HTMLInputElement = document.createElement('input')
    private statusParagraph: HTMLParagraphElement = document.createElement('p')

    private joinLobbyCallback: JoinLobbyCallback | null = null
    private createLobbyCallback: CreateLobbyCallback | null = null

    private localizableElements: LocalizableElement[] = [
        { element: this.titleHeading, key: "Home" },
        { element: this.joinLobbyButton, key: "Join Lobby" },
        { element: this.createLobbyButton, key: "Create Lobby" },
        { element: this.joinLobbyIdInput, key: "Enter lobby id" },
        { element: this.createLobbyNameInput,key: "Enter lobby name" },
    ]

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''

        this.rootElement.appendChild(this.titleHeading)
        this.rootElement.appendChild(this.statusParagraph)
        this.rootElement.appendChild(this.joinLobbyIdInput)
        this.rootElement.appendChild(this.joinLobbyButton)
        this.rootElement.appendChild(this.createLobbyNameInput)
        this.rootElement.appendChild(this.createLobbyButton)

        this.statusParagraph.id = ElementIds.HOME_STATUS_ID

        this.joinLobbyButton.addEventListener('click', () => {
            const id = this.joinLobbyIdInput.value
            if (id.length > 0) {
                this.joinLobbyCallback?.(id)
            }
        })

        this.createLobbyButton.addEventListener('click', () => {
            const name = this.createLobbyNameInput.value
            if (name.length > 0) {
                this.createLobbyCallback?.(name)
            }
        })
    }

    setJoinLobbyCallback(value: JoinLobbyCallback | null): HomeView {
        this.joinLobbyCallback = value
        return this
    }

    setCreateLobbyCallback(value: CreateLobbyCallback | null): HomeView {
        this.createLobbyCallback = value
        return this
    }
}