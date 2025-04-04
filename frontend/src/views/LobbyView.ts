import { i18n } from "./../localization/localization"
import * as ElementIds from "../constants/element-ids"

export class LobbyView {
    private container: HTMLElement
    private titleHeading: HTMLHeadingElement
    private player1Input: HTMLInputElement
    private player2Input: HTMLInputElement
    private createGameButton: HTMLButtonElement
    private lobbyId: string
    private onCreateGame: (player1: string, player2: string) => void

    constructor(containerId: string, lobbyId: string, onCreateGame: (player1: string, player2: string) => void) {
        this.container = document.getElementById(containerId) as HTMLElement
        
        if (!this.container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        this.container.innerHTML = ''

        this.titleHeading = document.createElement('h1')
        this.container.append(this.titleHeading)

        this.player1Input = document.createElement('input')
        this.player1Input.id = ElementIds.PLAYER_1_NAME_INPUT_ID
        this.container.append(this.player1Input)

        this.player2Input = document.createElement('input')
        this.player1Input.id = ElementIds.PLAYER_2_NAME_INPUT_ID
        this.container.append(this.player2Input)

        this.createGameButton = document.createElement('button')
        this.createGameButton.id = ElementIds.CREATE_GAME_BUTTON_ID
        this.container.append(this.createGameButton)

        this.lobbyId = lobbyId
        this.onCreateGame = onCreateGame

        this.renderLocalizedTexts()

        this.createGameButton.addEventListener('click', () => {
            const player1 = this.player1Input.value
            const player2 = this.player2Input.value
            if (!player1 || !player2) {
                this.showAlert(i18n("Two players are needed"))
            } else if (player1 == player2) {
                this.showAlert(i18n("Player name should not be the same"))
            } else {
                this.onCreateGame(player1, player2)
            }
        })
    }

    async showAlert(textPromise: Promise<string>) {
        try {
            const text = await textPromise
            alert(text)
        } catch (error) {
            console.error("Error getting text:", error)
            alert("An unknown error occured")
        }
    }

    async renderLocalizedTexts() {
        this.titleHeading.textContent = `${await i18n("Lobby")} ${this.lobbyId}`
        this.player1Input.placeholder = await i18n("Enter player 1")
        this.player2Input.placeholder = await i18n("Enter player 2")
        this.createGameButton.textContent = await i18n("Create game")
    }
}