import { i18n } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

export class CreateLobbyView {
    private container: HTMLElement
    private titleHeading: HTMLHeadingElement
    private playerNameInput: HTMLInputElement
    private createButton: HTMLButtonElement
    private onCreate: (playerName: string) => void

    constructor(containerId: string, onCreate: (playerName: string) => void) {
        this.container = document.getElementById(containerId) as HTMLElement
        
        if (!this.container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        this.container.innerHTML = ''

        this.titleHeading = document.createElement('h1')
        this.container.append(this.titleHeading)

        this.playerNameInput = document.createElement('input')
        this.playerNameInput.id = ElementIds.PLAYER_NAME_INPUT_ID
        this.container.appendChild(this.playerNameInput)

        this.createButton = document.createElement('button')
        this.createButton.id = ElementIds.CREATE_LOBBY_BUTTON_ID
        this.container.appendChild(this.createButton)

        this.onCreate = onCreate

        this.renderLocalizedTexts()

        this.createButton.addEventListener('click', () => {
            const playerName = this.playerNameInput.value
            if (playerName) {
                this.onCreate(playerName)
                this.playerNameInput.value = ""
            } else {
                this.showAlert(i18n("Please enter a player name"))
            }
        })
    }

    async showAlert(textPromise: Promise<string>) {
        try {
            const text = await textPromise;
            alert(text)
        } catch (error) {
            console.error("Error getting text:", error)
            alert("An error occurred.")
        }
    }

    async renderLocalizedTexts() {
        this.titleHeading.textContent = await i18n("Create Lobby")
        this.playerNameInput.placeholder = await i18n("Enter player name")
        this.createButton.textContent = await i18n('Create')
    }
}