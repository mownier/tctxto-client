import { LocalizableElement, renderLocalizedTexts, setLocaleAutomatically } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'
import { NoSessionHeaderView } from './views/NoSessionHeaderView'
import { WelcomeView } from './views/WelcomeView'
import { ClientCallback, createLobby, getLatestData, setClientCallback, signIn, signOut, signUp, subscribe } from './grpc/client'
import { WithSessionHeaderView } from './views/WithSessionHeaderView'
import { EmptytView } from './views/EmptyView'
import { HomeView } from './views/HomeView'
import { MyLobbyView } from './views/MyLobbyView'
import { ErrorView } from './views/ErrorView'
import { Lobby, Player } from './grpc/tctxto_pb'

async function main() {
    try {
        await setLocaleAutomatically()
    } catch (error) {
        console.error("locale not set automatically:", error)
    }
    
    const mainRootElement = document.getElementById(ElementIds.MAIN_ROOT_ID) as HTMLElement

    if (!mainRootElement) {
        console.error("main root not found")
        return
    }

    const mainRootView = new MainRootView(mainRootElement)
    const mainRootHeaderElement = document.getElementById(ElementIds.MAIN_ROOT_HEADER_ID) as HTMLElement
    const mainRootContentElement = document.getElementById(ElementIds.MAIN_ROOT_CONTENT_ID) as HTMLElement

    if (!mainRootHeaderElement) {
        console.error("main root header not found")
        return
    }

    const clientCallback = new MyClientCallback(mainRootElement, mainRootHeaderElement, mainRootContentElement)
    setClientCallback(clientCallback)

    try {
        await subscribe()
    } catch {
        const errorView = new ErrorView(mainRootElement, "Please refresh page")
    }
}

class MyClientCallback implements ClientCallback {
    private mainRootElement: HTMLElement
    private mainRootContentElement: HTMLElement
    private mainRootHeaderElement: HTMLElement

    constructor(
        mainRootElement: HTMLElement,
        mainRootHeaderElement: HTMLElement,
        mainRootContentElement: HTMLElement
    ) {
        this.mainRootElement = mainRootElement
        this.mainRootHeaderElement = mainRootHeaderElement
        this.mainRootContentElement = mainRootContentElement
    }

    showHome(): void {
        const headerView = this.newWithSessionHeaderView()
        const contentView = new HomeView(this.mainRootContentElement)
            .setCreateLobbyCallback(async (lobbyName: string) => {
                try {
                    await createLobby(lobbyName)
                } catch {
                    this.createLobbyNotOkay()
                }
            })
            .setJoinLobbyCallback((lobbyId: string) => {
                console.log("lobby id to join:", lobbyId)
            })
    }

    showWelcome(): void {
        const headerView = new NoSessionHeaderView(this.mainRootHeaderElement)
            .setSignInCallback(async (name: string, pass: string) => {
                try {
                    await signIn(name, pass)
                } catch {
                    this.signInNotOkay()
                }
            })
            .setSignUpCallback(async (name: string, pass: string) => {
                try {
                    await signUp(name, pass)
                } catch {
                    this.signUpNotOkay()
                }
            })
        const contentView = new WelcomeView(this.mainRootContentElement)
    }

    showGame(): void {
        const headerView = new EmptytView(this.mainRootHeaderElement)
        const contentView = new EmptytView(this.mainRootContentElement)
    }

    showMyLobby(): void {
        const headerView = this.newWithSessionHeaderView()
        const contentView = new MyLobbyView(this.mainRootContentElement)
            .setCreateGameCallback((player1, player2) => {
                console.log(`todo: create game for player1 = ${player1}, player2 = ${player2}`)
            })
    }

    signUpNotOkay(): void {
        const element = document.getElementById(ElementIds.NO_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: "Encountered error while signing up. Please try again." },
        ]
        renderLocalizedTexts(localizableElements)
    }

    signInNotOkay(): void {
        const element = document.getElementById(ElementIds.NO_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: "Encountered error while signing in. Please try again." },
        ]
        renderLocalizedTexts(localizableElements)
    }

    signOutNotOkay(): void {
        const element = document.getElementById(ElementIds.WITH_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: "Encountered error while signing out. Please try again." },
        ]
        renderLocalizedTexts(localizableElements)
    }

    showRefreshPage(): void {
        const errorView = new ErrorView(this.mainRootElement, "Please refresh page")
    }

    playerUsingOtherClient(message: string): void {
        const element = document.getElementById(ElementIds.NO_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: message },
        ]
        renderLocalizedTexts(localizableElements)
    }

    createLobbyNotOkay(): void {
        const element = document.getElementById(ElementIds.HOME_STATUS_ID) as HTMLElement
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: "Encountered error while creating a lobby. Please try again." },
        ]
        renderLocalizedTexts(localizableElements)
    }

    displayMyLobbyDetails(lobby: Lobby): void {
        const nameHeading = document.getElementById(ElementIds.MY_LOBBY_NAME_ID) as HTMLHeadingElement
        if (nameHeading) {
            nameHeading.textContent = lobby.getName()
        }

        const playersTable = document.getElementById(ElementIds.MY_LOBBY_PLAYERS_TABLE_ID) as HTMLTableElement
        if (playersTable) {
            playersTable.innerHTML = ''
            const thead: HTMLTableSectionElement = document.createElement('thead')
            const headerRow: HTMLTableRowElement = thead.insertRow()
            const headers: string[] = ["Name"]
            const localizableElements: LocalizableElement[] = []
            headers.forEach(headerText => {
                const th: HTMLElement = document.createElement('th')
                headerRow.appendChild(th)
                localizableElements.push({ element: th, key: headerText })
            })
            playersTable.appendChild(thead)
            renderLocalizedTexts(localizableElements)
        
            const tbody: HTMLTableSectionElement = document.createElement('tbody')
            lobby.getPlayersList().forEach(player => {
                if (player) {
                    const row: HTMLTableRowElement = tbody.insertRow()
                    const cellsData: string[] = [player.getName()]
                    cellsData.forEach(cellData => {
                        const cell: HTMLTableCellElement = row.insertCell()
                        cell.textContent = cellData
                    })
                }   
            })
            playersTable.appendChild(tbody)
        }

        const player1Select = document.getElementById(ElementIds.PLAYER_1_SELECT_ID) as HTMLSelectElement
        const player2Select = document.getElementById(ElementIds.PLAYER_2_SELECT_ID) as HTMLSelectElement

        if (player1Select && player2Select) {
            const setupSelect = (selectElement: HTMLSelectElement, data: Player[]) => {
                selectElement.innerHTML = ''
                const emptyOption: HTMLOptionElement = document.createElement('option')
                emptyOption.value = ''
                emptyOption.textContent = ''
                emptyOption.selected = true
                selectElement.appendChild(emptyOption)
                data.forEach(player => {
                    if (player) {
                        const option: HTMLOptionElement = document.createElement('option')
                        option.value = player.getId()
                        option.textContent = player.getName()
                        selectElement.appendChild(option)
                    }
                })
            }
            setupSelect(player1Select, lobby.getPlayersList())
            setupSelect(player2Select, lobby.getPlayersList())
        }
    }

    updatePlayerDisplayName(name: string): void {
        const element = document.getElementById(ElementIds.PLAYER_DISPLAY_NAME_ID) as HTMLParagraphElement
        if (!element) {
            return
        }
        element.textContent = name
    }

    private newWithSessionHeaderView(): WithSessionHeaderView {
        return new WithSessionHeaderView(this.mainRootHeaderElement, getLatestData().playerDisplayName)
            .setSignOutCallback(async () => {
                try {
                    await signOut()
                } catch {
                    new ErrorView(this.mainRootContentElement, "Encountered error while signing out. Please try again.")
                }
            })
    }
}

main()
