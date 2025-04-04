import { GameView } from "../views/GameView"
import * as ElementIds from "../constants/element-ids"

export function showGameView(gameId: string): GameView {
    return new GameView(ElementIds.MAIN_ROOT_CONTENT_ID, gameId)
}