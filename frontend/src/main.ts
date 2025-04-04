import { CreateLobbyView } from './views/CreateLobbyView'
import { LobbyView } from './views/LobbyView'
import { GameView } from './views/GameView'
import { setLocale } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'

async function main() {
    await setLocale("fil")
    new MainRootView(ElementIds.MAIN_ROOT_ID)
    showCreateLobbyView()
}

function showCreateLobbyView(): CreateLobbyView {
    return new CreateLobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, (playerName: string) => {
        const lobbyId = "1"
        showLobbyView(lobbyId)
    })
}

function showLobbyView(lobbyId: string): LobbyView {
    return new LobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, lobbyId, (player1: string, player2: string) => {
        const gameId = "1"
        showGameView(gameId)
    })
}

function showGameView(gameId: string): GameView {
    return new GameView(ElementIds.MAIN_ROOT_CONTENT_ID, gameId)
}

main()
