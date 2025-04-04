import { LobbyView } from "../views/LobbyView"
import { showGameView } from './show-game-view'
import * as ElementIds from "../constants/element-ids"

export function showLobbyView(lobbyId: string): LobbyView {
    return new LobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, lobbyId, (player1: string, player2: string) => {
        const gameId = "1"
        showGameView(gameId)
    })
}