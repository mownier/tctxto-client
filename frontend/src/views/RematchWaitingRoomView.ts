import * as ElementIds from "../constants/element-ids"


type CancelCallback = () => void

export class RematchWaitingRoomView {
    private rootElement: HTMLElement

    private titleHeading: HTMLHeadingElement = document.createElement('h1')
    private subtitleParagraph: HTMLParagraphElement = document.createElement('p')
    private cancelConfirmationTitleParagraph: HTMLParagraphElement = document.createElement('p')
    private cancelButton: HTMLButtonElement = document.createElement('button')
    private contentDivElement: HTMLDivElement = document.createElement('div')

    private cancelCallback: CancelCallback | null = null

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''
        
        this.contentDivElement.appendChild(this.titleHeading)
        this.contentDivElement.appendChild(this.subtitleParagraph)
        this.contentDivElement.appendChild(this.cancelConfirmationTitleParagraph)
        this.contentDivElement.appendChild(this.cancelButton)
        this.rootElement.appendChild(this.contentDivElement)

        this.contentDivElement.id = ElementIds.REMATCH_WAITING_ROOM_CONTENT_DIV_ID

        this.titleHeading.textContent = "Rematch Waiting Room"
        this.subtitleParagraph.textContent = "Please wait for the other player to confirm the rematch"
        this.cancelConfirmationTitleParagraph.textContent = "Would you rather like to cancel the rematch?"
        this.cancelButton.textContent = "YES"

        this.cancelButton.addEventListener('click', () => {
            this.cancelCallback?.()
        })
    }

    setCancelCallback(value: CancelCallback | null): RematchWaitingRoomView {
        this.cancelCallback = value
        return this
    }
}