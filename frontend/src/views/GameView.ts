import { i18n } from "../localization/localization"

export class GameView {
    private gameId: string
    private container: HTMLElement
    private titleHeading: HTMLHeadElement

    constructor(containerId: string, gameId: string) {
        this.container = document.getElementById(containerId) as HTMLElement

        if (!this.container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        this.container.innerHTML = ''

        this.titleHeading = document.createElement('h1')
        this.container.appendChild(this.titleHeading)

        this.gameId = gameId

        this.renderLocalizedTexts()
    }

    async renderLocalizedTexts() {
        this.titleHeading.textContent = `${await i18n("Game")} ${this.gameId}`
    }
}