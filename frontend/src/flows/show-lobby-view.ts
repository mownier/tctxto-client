import { LobbyView } from "../views/LobbyView"
import { showGameView } from './show-game-view'
import * as ElementIds from "../constants/element-ids"
import { getSession } from "../store/store"
import { Session } from "../models/Session"
import { createGame, removeGameCreationStream, subscribeGameCreatedUpdates } from "../grpc/client"
import { Game } from "../models/Game"

export function showLobbyView(): LobbyView | null {
    let session: Session
    try {
        session = getSession()
    } catch (error) {
        throw error
    }
    if (session.game) {
        showGameView(session.game.id)
        return null
    }
   
    return new LobbyView(
        ElementIds.MAIN_ROOT_CONTENT_ID,
        session.lobby.id, 
        `${session.player.name}: ${session.player.id}`,
        (player1: string, player2: string) => {
            createGame(session.lobby.id, player1, player2)
        },
        () => {
            subscribeGameCreatedUpdates(session.lobby.id, session.player.id, (game: Game) => {
                session.game = game
                console.log("[STREAM] Will stop stream")
                removeGameCreationStream(session.lobby.id, session.player.id)
                console.log("[STREAM] Will show game")
                showGameView(game.id)
            })
        }
    )
}