import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

type CreateGameCallback = (player1: string, player2: string) => void

export class MyLobbyView {
    private rootElement: HTMLElement

    private titleHeading: HTMLHeadingElement = document.createElement('h1')
    private nameHeading: HTMLHeadingElement = document.createElement('h2')
    private leaveButton: HTMLButtonElement = document.createElement('button')
    private playersTitleHeading: HTMLHeadingElement = document.createElement('h3')
    private statusParagraph: HTMLParagraphElement = document.createElement('p')
    private createGameButton: HTMLButtonElement = document.createElement('button')
    private playersTable: HTMLTableElement = document.createElement('table')
    private player1SelectLabel: HTMLLabelElement = document.createElement('label')
    private player2SelectLabel: HTMLLabelElement = document.createElement('label')
    private player1Select: HTMLSelectElement = document.createElement('select')
    private player2Select: HTMLSelectElement = document.createElement('select')

    private createGameCallback: CreateGameCallback | null = null

    private localizableElements: LocalizableElement[] = [
        { element: this.titleHeading, key: "My Lobby" },
        { element: this.leaveButton, key: "Leave" },
        { element: this.playersTitleHeading, key: "Players" },
        { element: this.player1SelectLabel, key: "Enter player 1" },
        { element: this.player2SelectLabel, key: "Enter player 2" },
        { element: this.createGameButton, key: "Create Game" },
    ]

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''

        this.rootElement.appendChild(this.titleHeading)
        this.rootElement.appendChild(this.nameHeading)
        this.rootElement.appendChild(this.statusParagraph)
        this.rootElement.appendChild(this.leaveButton)
        this.rootElement.appendChild(this.player1SelectLabel)
        this.rootElement.appendChild(this.player1Select)
        this.rootElement.appendChild(this.player2SelectLabel)
        this.rootElement.appendChild(this.player2Select)
        this.rootElement.appendChild(this.createGameButton)
        this.rootElement.appendChild(this.playersTitleHeading)
        this.rootElement.appendChild(this.playersTable)

        this.nameHeading.id = ElementIds.MY_LOBBY_NAME_ID
        this.statusParagraph.id = ElementIds.MY_LOBBY_STATUS_ID
        this.createGameButton.id = ElementIds.CREATE_GAME_BUTTON_ID
        this.playersTable.id = ElementIds.MY_LOBBY_PLAYERS_TABLE_ID
        this.player1Select.id = ElementIds.PLAYER_1_SELECT_ID
        this.player2Select.id = ElementIds.PLAYER_2_SELECT_ID

        this.createGameButton.addEventListener('click', () => {
            const player1 = this.player1Select.value
            const player2 = this.player2Select.value
            this.createGameCallback?.(player1, player2)
        })
    }

    setCreateGameCallback(value: CreateGameCallback | null): MyLobbyView {
        this.createGameCallback = value
        return this
    }
}