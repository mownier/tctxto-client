import * as ElementIds from "../constants/element-ids"

export class MainRootView {
    private rootElement: HTMLElement

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement
        this.initializeView()
    }

    private initializeView() {
        const header = document.createElement('div')
        header.id = ElementIds.MAIN_ROOT_HEADER_ID
        this.rootElement.appendChild(header)

        const content = document.createElement('div')
        content.id = ElementIds.MAIN_ROOT_CONTENT_ID
        this.rootElement.appendChild(content)

        const footer = document.createElement('div')
        footer.id = ElementIds.MAIN_ROOT_FOOTER_ID
        this.rootElement.appendChild(footer)
    }
}