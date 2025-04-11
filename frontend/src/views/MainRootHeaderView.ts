import { i18n } from "../localization/localization"

export class MainRootHeaderView {
    private invalidateButton: HTMLButtonElement
    private onInvalidate: () => void

    constructor(containerId: string, onInvalidate: () => void) {
        const container = document.getElementById(containerId)

        if (!container) {
            throw new Error(`container with ${containerId} not found`)
        }

        this.invalidateButton = document.createElement('button')
        container.appendChild(this.invalidateButton)

        this.onInvalidate = onInvalidate

        this.renderLocalizedTexts()

        this.invalidateButton.addEventListener('click', () => {
            this.onInvalidate()
        })
    }

    async renderLocalizedTexts() {
        this.invalidateButton.textContent = await i18n("Invalidate")
    }
}