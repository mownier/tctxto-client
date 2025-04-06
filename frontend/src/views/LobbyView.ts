import { i18n } from "./../localization/localization"
import * as ElementIds from "../constants/element-ids"

export class LobbyView {
    private container: HTMLElement
    private titleHeading: HTMLHeadingElement
    private playerNameHeading: HTMLHeadingElement
    private player1Input: HTMLInputElement
    private player2Input: HTMLInputElement
    private createGameButton: HTMLButtonElement
    private lobbyId: string
    private onCreateGame: (player1: string, player2: string) => void
    private onInit: () => void
    private onDestroy: () => void

    constructor(
        containerId: string, 
        lobbyId: string, 
        playerName: string,
        onCreateGame: (player1: string, player2: string) => void,
        onInit: () => void,
        onDestroy: () => void
    ) {
        console.log(`[LobbyView] Constructor: Creating LobbyView for lobbyId=${lobbyId}`);
        
        this.container = document.getElementById(containerId) as HTMLElement
        
        if (!this.container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        this.container.innerHTML = ''

        this.titleHeading = document.createElement('h1')
        this.container.append(this.titleHeading)

        this.playerNameHeading = document.createElement('h2')
        this.playerNameHeading.textContent = playerName
        this.container.append(this.playerNameHeading)

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

        this.onInit = onInit
        this.onInit()

        this.onDestroy = onDestroy
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
        this.createGameButton.textContent = await i18n("Create Game")
    }

    updateView(newData: any) {
        console.log(`[LobbyView] updateView: Updating view with new data`, newData)
    }

    cleanup() {
        console.log(`[LobbyView] cleanup: Destroying LobbyView`)
        this.onDestroy()
    }
}