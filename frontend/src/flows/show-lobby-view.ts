import { LobbyView } from "../views/LobbyView"
import { showGameView } from './show-game-view'
import * as ElementIds from "../constants/element-ids"
import { getSession } from "../store/store"
import { Session } from "../models/Session"

export function showLobbyView(): LobbyView {
    let session: Session
    try {
        session = getSession()
    } catch (error) {
        throw error
    }
    return new LobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, session.lobby.id, (player1: string, player2: string) => {
        const gameId = "1"
        showGameView(gameId)
    })
}