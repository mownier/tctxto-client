import { i18n } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

export class GameView {
    private gameId: string
    private container: HTMLElement
    private titleHeading: HTMLHeadingElement
    private statusHeading: HTMLHeadingElement
    private onMove: (position: number) => void

    constructor(containerId: string, gameId: string, onMove: (position: number) => void, onInit: (view: GameView) => void) {
        this.container = document.getElementById(containerId) as HTMLElement

        if (!this.container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        this.container.innerHTML = ''

        this.titleHeading = document.createElement('h1')
        this.container.appendChild(this.titleHeading)

        this.statusHeading = document.createElement('h2')
        this.container.appendChild(this.statusHeading)

        const gameContainer = document.createElement('div')
        gameContainer.id = ElementIds.GAME_CONTAINER_DIV_ID
        this.container.appendChild(gameContainer)

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                const position = (i * 3) + j
                cell.classList.add("cell");
                cell.id = `cell-tag-${position}`
                cell.textContent = ""
                cell.dataset.row = i.toString()
                cell.dataset.col = j.toString()
                cell.addEventListener("click", () => this.handleCellClick(position));
                gameContainer.appendChild(cell);
            }
        }

        this.gameId = gameId
        this.onMove = onMove

        this.renderLocalizedTexts()

        onInit(this)
    }

    async renderLocalizedTexts() {
        this.titleHeading.textContent = `${await i18n("Game")} ${this.gameId}`
    }

    handleCellClick(position: number) {
        this.onMove(position)
    }

    updateCellTag(position: number, textContent: string) {
        const cell = document.getElementById(`cell-tag-${position}`)
        if (!cell) {
            return
        }
        cell.textContent = textContent
    }

    async updateStatusHeadingText(textPromise: Promise<string>) {
        this.statusHeading.textContent = await textPromise
    }
}