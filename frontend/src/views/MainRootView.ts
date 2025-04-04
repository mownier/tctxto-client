import * as ElementIds from "../constants/element-ids"

export class MainRootView {
    constructor(containerId: string) {
        const container = document.getElementById(containerId) as HTMLElement
        
        if (!container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        const header = document.createElement('div')
        header.id = ElementIds.MAIN_ROOT_HEADER_ID
        container.appendChild(header)

        const content = document.createElement('div')
        content.id = ElementIds.MAIN_ROOT_CONTENT_ID
        container.appendChild(content)

        const footer = document.createElement('div')
        footer.id = ElementIds.MAIN_ROOT_FOOTER_ID
        container.appendChild(footer)
    }
}