import { LocalizableElement, renderLocalizedTexts } from "../localization/localization"
import * as ElementIds from "../constants/element-ids"

type MoveCallback = (position: number) => void

export class GameView {
    private rootElement: HTMLElement

    private titleHeading: HTMLHeadingElement = document.createElement('h1')
    private statusParagraph: HTMLHeadingElement = document.createElement('p')
    private gameContainer: HTMLDivElement = document.createElement('div')

    private youMoverParagraph: HTMLParagraphElement = document.createElement('p')
    private otherMoverParagraph: HTMLParagraphElement = document.createElement('p')
    private moverParagraph: HTMLParagraphElement = document.createElement('p')
    
    private moveCallback: MoveCallback | null = null

    private localizableElements: LocalizableElement[] = [
        { element: this.titleHeading, key: "Game" },
    ]

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
        renderLocalizedTexts(this.localizableElements)
    }

    private initializeView(): void {
        this.rootElement.innerHTML = ''

        this.rootElement.appendChild(this.titleHeading) 
        this.rootElement.appendChild(this.youMoverParagraph)
        this.rootElement.appendChild(this.otherMoverParagraph)
        this.rootElement.appendChild(this.gameContainer)
        this.rootElement.appendChild(this.moverParagraph)
        this.rootElement.appendChild(this.statusParagraph)

        this.gameContainer.id = ElementIds.GAME_CONTAINER_DIV_ID
        this.youMoverParagraph.id = ElementIds.YOU_MOVER_INFO_ID
        this.otherMoverParagraph.id = ElementIds.OTHER_MOVER_INFO_ID
        this.moverParagraph.id = ElementIds.MOVER_INFO_ID

        this.statusParagraph.id = ElementIds.GAME_STATUD_ID

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div') as HTMLDivElement
                const position = (i * 3) + j
                cell.classList.add('cell')
                cell.id = `${ElementIds.CELL_BOARD_POSITION_PREFIX_ID}${position}`
                cell.textContent = ''
                cell.dataset.row = i.toString()
                cell.dataset.col = j.toString()
                cell.addEventListener('click', () => {
                    this.moveCallback?.(position)
                })
                this.gameContainer.appendChild(cell)
            }
        }
    }

    setMoveCallback(value: MoveCallback | null): GameView {
        this.moveCallback = value
        return this
    }
}