import { i18n } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

export class JoinLobbyView {
    private titleHeading: HTMLHeadingElement
    private lobbyIdInput: HTMLInputElement
    private playerNameInput: HTMLInputElement
    private joinButton: HTMLButtonElement
    private onJoin: (lobbyId: string, playerName: string) => void
    
    constructor(containerId: string, onJoin: (lobbyId: string, playerName: string) => void) {
        const container = document.getElementById(containerId) as HTMLElement

        if (!container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        container.innerHTML = ''

        this.titleHeading = document.createElement('h1')
        container.appendChild(this.titleHeading)

        this.lobbyIdInput = document.createElement('input')
        this.lobbyIdInput.id = ElementIds.LOBBY_ID_INPUT_ID
        container.appendChild(this.lobbyIdInput)

        this.playerNameInput = document.createElement('input')
        this.playerNameInput.id = ElementIds.PLAYER_NAME_INPUT_ID
        container.appendChild(this.playerNameInput)

        this.joinButton = document.createElement('button')
        this.joinButton.id = ElementIds.JOIN_LOBBY_BUTTON_ID
        container.appendChild(this.joinButton)

        this.onJoin = onJoin

        this.renderLocalizedTexts()

        this.joinButton.addEventListener('click', () => {
            const playerName = this.playerNameInput.value
            const lobbyId = this.lobbyIdInput.value
            if (!lobbyId) {
                this.showAlert(i18n("Please enter lobby id"))
                return
            }
            if (!playerName) {
                this.showAlert(i18n("Please enter a player name"))
                return
            }
            this.onJoin(lobbyId, playerName)
        })
    }

    async showAlert(textPromise: Promise<string>) {
        try {
            const text = await textPromise
            alert(text)
        } catch (error) {
            console.error("Error getting text:", error)
            alert("An error occurred.")
        }
    }

    async renderLocalizedTexts() {
        this.titleHeading.textContent = await i18n("Join Lobby")
        this.lobbyIdInput.placeholder = await i18n("Enter lobby id")
        this.joinButton.textContent = await  i18n("Join")
        this.playerNameInput.placeholder = await i18n("Enter player name")
    }
}