import { LocalizableElement, renderLocalizedTexts, setLocaleAutomatically } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'
import { NoSessionHeaderView } from './views/NoSessionHeaderView'
import { WelcomeView } from './views/WelcomeView'
import { ClientCallback, createGame, createLobby, getLatestData, joinLobby, leaveMyLobby, makeMove, setClientCallback, signIn, signOut, signUp, subscribe } from './grpc/client'
import { WithSessionHeaderView } from './views/WithSessionHeaderView'
import { EmptytView } from './views/EmptyView'
import { HomeView } from './views/HomeView'
import { MyLobbyView } from './views/MyLobbyView'
import { ErrorView } from './views/ErrorView'
import { Lobby, Mover, Player, Technicality, Winner } from './grpc/tctxto_pb'
import { GameView } from './views/GameView'

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
            .setJoinLobbyCallback(async (lobbyId: string) => {
                try {
                    await joinLobby(lobbyId)
                } catch {
                    this.joinLobbyNotOkay()
                }
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
        const contentView = new GameView(this.mainRootContentElement)
            .setMoveCallback(async (position: number) => {
                try {
                    await makeMove(position)
                } catch {
                    this.makeMoveNotOkay()
                }
            })
    }

    showMyLobby(): void {
        const headerView = this.newWithSessionHeaderView()
        const contentView = new MyLobbyView(this.mainRootContentElement)
            .setCreateGameCallback(async (player1, player2) => {
                if (player1.length == 0) {
                    this.updateMyLobbyStatus("player1 is empty")
                    return
                }
                if (player2.length == 0) {
                    this.updateMyLobbyStatus("player2 is empty")
                    return
                }
                try {
                    await createGame(player1, player2)
                } catch (error) {
                    this.createGameNotOkay()
                }
            })
            .setCopyLobbyIdCallback(() => {
                const lobbyId = getLatestData().lobby?.getId()
                if (lobbyId) {
                    this.copyTextToClipboard(lobbyId)
                        .then(() => this.updateMyLobbyStatus("Copied lobby ID to clipboard"))
                        .catch((error) => this.updateMyLobbyStatus("Unable to copy lobby ID"))
                }
            })
            .setLeaveCallback(async () => {
                try {
                    await leaveMyLobby()
                } catch {
                    this.leaveMyLobbyNotOkay()
                }
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
        this.updateHomeStatus("Encountered error while creating a lobby. Please try again.")
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
                        cell.id = player.getId()
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

    joinLobbyNotOkay(): void {
        this.updateHomeStatus("Unable to join lobby")
    }

    leaveMyLobbyNotOkay(): void {
        this.updateMyLobbyStatus("Unable to leave lobby")
    }

    someoneJoinedMyLobby(id: string, name: string): void {
        const player1Select = document.getElementById(ElementIds.PLAYER_1_SELECT_ID) as HTMLSelectElement
        const player2Select = document.getElementById(ElementIds.PLAYER_2_SELECT_ID) as HTMLSelectElement
        const insertOption = (select: HTMLSelectElement | null, id: string, name: string) => {
            if (select) {
                const option = document.createElement('option')
                option.value = id
                option.textContent = name
                select.appendChild(option)
            }
        }
        insertOption(player1Select, id, name)
        insertOption(player2Select, id, name)

        const playersTable = document.getElementById(ElementIds.MY_LOBBY_PLAYERS_TABLE_ID) as HTMLTableElement
        if (playersTable) {
            const newRow: HTMLTableRowElement = playersTable.insertRow()
            const newCell = newRow.insertCell()
            newCell.id = id
            newCell.textContent = name
            console.log(`cell ${id} is inserted`)
        }
    }

    someoneLeftMyLobby(id: string): void {
        const player1Select = document.getElementById(ElementIds.PLAYER_1_SELECT_ID) as HTMLSelectElement
        const player2Select = document.getElementById(ElementIds.PLAYER_2_SELECT_ID) as HTMLSelectElement
        const removeOption = (select: HTMLSelectElement | null, id: string) => {
            if (select) {
                const options = select.querySelectorAll('option')
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === id) {
                        select.removeChild(options[i])
                    }
                }
            }
        }
        removeOption(player1Select, id)
        removeOption(player2Select, id)

        const playersTable = document.getElementById(ElementIds.MY_LOBBY_PLAYERS_TABLE_ID) as HTMLTableElement
        const cellToRemove = document.getElementById(id) as HTMLTableCellElement;
        if (playersTable && cellToRemove) {
            const row = cellToRemove.parentNode as HTMLTableRowElement;
            if (row) {
                const cellIndex = Array.from(row.cells).indexOf(cellToRemove);
                if (cellIndex >= -1) {
                    console.log(`cell ${id} is removed`)
                    row.deleteCell(cellIndex)
                }
            }
        }
    }

    createGameNotOkay(): void {
        this.updateMyLobbyStatus("Unable to create game")
    }

    makeMoveNotOkay(): void {
        this.updateGameStatus("Unable to move")
    }

    gameStarted(): void {
        const youMoverParagraph = document.getElementById(ElementIds.YOU_MOVER_INFO_ID) as HTMLParagraphElement
        const otherMoverParagraph = document.getElementById(ElementIds.OTHER_MOVER_INFO_ID) as HTMLParagraphElement
        const gameStatus = getLatestData().gameStatus
        if (!gameStatus || !youMoverParagraph || !otherMoverParagraph) {
            return
        }
        // TODO: Localization
        if (gameStatus.you == Mover.O) {
            youMoverParagraph.textContent = "You are O"
            otherMoverParagraph.textContent = "Other is X"
        } else if (gameStatus.you == Mover.X) {
            youMoverParagraph.textContent = "You are X"
            otherMoverParagraph.textContent = "Other is O"
        }
    }

    nextMoverDetermined(): void {
        const gameStatus = getLatestData().gameStatus
        if (!gameStatus) {
            return
        }
        // TODO: Localization
        if (gameStatus.mover == Mover.O) {
            this.updateMoverInfo("O turns to move")
        } else if (gameStatus.mover == Mover.X) {
            this.updateMoverInfo("X turns to move")
        }
    }

    moveUpdated(): void {
        const gameStatus = getLatestData().gameStatus
        if (!gameStatus) {
            return
        }
        const move = gameStatus.move
        if (!move) {
            return
        }
        const element = document.getElementById(`${ElementIds.CELL_BOARD_POSITION_PREFIX_ID}${move.getPosition()}`) as HTMLDivElement
        if (!element) {
            return
        }
        if (move.getMover() == Mover.O) {
            element.textContent = "O"
        } else if (move.getMover() == Mover.X) {
            element.textContent = "X"
        }
    }

    winnerDetermined(): void {
        const gameStatus = getLatestData().gameStatus
        if (!gameStatus) {
            return
        }
        const winner = gameStatus.winner
        const technicality = gameStatus.winTechnicality
        if (!winner || !technicality) {
            return
        }
        if (winner.valueOf() === 0) {
            if (technicality == Technicality.BY_FORFEIT) {
                this.updateMoverInfo("You WIN by forfeit")
                return
            }
            if (technicality == Technicality.NO_PROBLEM) {
                this.updateMoverInfo("You WIN")
                return
            }
            return
        }
        if (winner.valueOf() === 1) {
            if (technicality == Technicality.BY_FORFEIT) {
                this.updateMoverInfo("Other WIN by forfeit")
                return
            }
            if (technicality == Technicality.NO_PROBLEM) {
                this.updateMoverInfo("Other WIN")
                return
            }
            return
        }
    }

    noOneWins(): void {
        // TODO: localization
        this.updateMoverInfo("Draw")
    }

    private updateMoverInfo(text: string): void {
        const element = document.getElementById(ElementIds.MOVER_INFO_ID) as HTMLParagraphElement
        if (!element) {
            return
        }
        element.textContent = text
    }

    private updateHomeStatus(text: string): void {
        const element = document.getElementById(ElementIds.HOME_STATUS_ID) as HTMLParagraphElement
        if (!element) {
            return
        }
        renderLocalizedTexts([
            { element: element, key: text },
        ])
    }

    private updateMyLobbyStatus(text: string): void {
        const element = document.getElementById(ElementIds.MY_LOBBY_STATUS_ID) as HTMLParagraphElement
        if (!element) {
            return
        }
        renderLocalizedTexts([
            { element: element, key: text },
        ])
    }

    private updateGameStatus(text: string): void {
        const element = document.getElementById(ElementIds.GAME_STATUD_ID) as HTMLParagraphElement
        if (!element) {
            return
        }
        renderLocalizedTexts([
            { element: element, key: text },
        ])
    }

    private async copyTextToClipboard(text: string): Promise<void> {
        if (!navigator.clipboard) {
            return Promise.reject(new Error("Clipboard API is not available in this environment."));
        }
        return navigator.clipboard.writeText(text);
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
