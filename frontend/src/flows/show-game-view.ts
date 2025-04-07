import { GameView } from "../views/GameView"
import * as ElementIds from "../constants/element-ids"
import { Session } from "../models/Session"
import { getSession, saveSession } from "../store/store"
import { showLobbyView } from "./show-lobby-view"
import { GameUpdate } from "../grpc/tctxto_pb"
import { makeMove, removeGameUpdateStream, subscribeGameUpdates } from "../grpc/client"
import { Game } from "../models/Game"
import { i18n } from "../localization/localization"

export function showGameView(): GameView | null {
    let session: Session
    try {
        session = getSession()
    } catch (error) {
        throw error
    }
    let game: Game | null = session.game
    if (!game) {
        showLobbyView()
        return null
    }
    return new GameView(
        ElementIds.MAIN_ROOT_CONTENT_ID, game.id,
        (position: number) => {
            makeMove(game.id, position, session.player.id)
        },
        (view: GameView) => {
            subscribeGameUpdates(game.id, session.player.id, (update: GameUpdate) => {
                const isMePlayer1 = game.player1Id === session.player.id
                const isMeToMove = update.getMover() === session.player.id
                let meTag = ""
                let otherPlayerTag = ""
                if (isMePlayer1) {
                    meTag = "X"
                    otherPlayerTag = "O"
                } else {
                    meTag = "O"
                    otherPlayerTag = "X"
                }
                if (isMeToMove) {
                    view.updateStatusHeadingText(i18n(`You = ${meTag}, Other = ${otherPlayerTag}, Your turn to move`))
                } else {
                    view.updateStatusHeadingText(i18n(`You = ${meTag}, Other = ${otherPlayerTag}, Other's turn to move`))
                }

                update.getBoardList().forEach((item, index) => {
                    if (item === session.player.id) {
                        view.updateCellTag(index, meTag)
                    } else if (item !== "") {
                        view.updateCellTag(index, otherPlayerTag)
                    }
                })
                if (update.getResult() === 1) {
                    session.game = null
                    saveSession(session)
                    removeGameUpdateStream(game.id, session.player.id)
                    showLobbyView()
                    alert(`Winner: Player ${update.getWinner()}`)
                    return
                }
                if (update.getResult() === 2) {
                    session.game = null
                    saveSession(session)
                    removeGameUpdateStream(game.id, session.player.id)
                    showLobbyView()
                    alert("Draw")
                    return
                }
            })
        }
    )
}