export class MainRootView {
    constructor(containerId: string) {
        const container = document.getElementById(containerId) as HTMLElement
        
        if (!container) {
            throw new Error(`container with id ${containerId} not found`)
        }

        const header = document.createElement('div')
        header.id = "main-root-header"
        container.appendChild(header)

        const content = document.createElement('div')
        content.id = "main-root-content"
        container.appendChild(content)

        const footer = document.createElement('div')
        footer.id= "main-root-footer"
        container.appendChild(footer)
    }
}