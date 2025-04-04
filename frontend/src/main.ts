import { CreateLobbyView } from './views/CreateLobbyView'
import { LobbyView } from './views/LobbyView'
import { GameView } from './views/GameView'
import { setLocale, setLocalesDirectory } from './localization/localization'

async function main() {
    setLocalesDirectory('/static/localization/locales/')
    await setLocale("fil")
    showCreateLobbyView()
}

function showCreateLobbyView(): CreateLobbyView {
    return new CreateLobbyView("main-root", (playerName: string) => {
        const lobbyId = "1"
        showLobbyView(lobbyId)
    })
}

function showLobbyView(lobbyId: string): LobbyView {
    return new LobbyView("main-root", lobbyId, (player1: string, player2: string) => {
        const gameId = "1"
        showGameView(gameId)
    })
}

function showGameView(gameId: string): GameView {
    return new GameView("main-root", gameId)
}



main()