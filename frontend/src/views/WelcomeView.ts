import { i18n } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

export class WelcomeView {
    private titleHeading: HTMLHeadElement
    private createLobbyButton: HTMLButtonElement
    private joinLobbyButton: HTMLButtonElement
    private onCreateLobby: () => void
    private onJoinLobby: () => void

    constructor(containerId: string, onCreateLobby: () => void, onJoinLobby: () => void) {
        const container = document.getElementById(containerId)

        if (!container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        this.titleHeading = document.createElement('h1')
        container.append(this.titleHeading)

        this.createLobbyButton = document.createElement('button')
        this.createLobbyButton.id = ElementIds.CREATE_LOBBY_BUTTON_ID
        container.append(this.createLobbyButton)

        this.joinLobbyButton = document.createElement('button')
        this.joinLobbyButton.id = ElementIds.JOIN_LOBBY_BUTTON_ID
        container.append(this.joinLobbyButton)

        this.onCreateLobby = onCreateLobby
        this.onJoinLobby = onJoinLobby

        this.renderLocalizedTexts()

        this.createLobbyButton.addEventListener('click', () => {
            this.onCreateLobby()
        })

        this.joinLobbyButton.addEventListener('click', () => {
            this.onJoinLobby()
        })
    }

    async renderLocalizedTexts() {
        this.titleHeading.textContent = await i18n("Welcome")
        this.createLobbyButton.textContent = await i18n("Create Lobby")
        this.joinLobbyButton.textContent = await i18n("Join Lobby")
    }
}