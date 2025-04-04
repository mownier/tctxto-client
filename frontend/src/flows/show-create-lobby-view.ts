import { CreateLobbyView } from '../views/CreateLobbyView'
import { showLobbyView } from './show-lobby-view'
import * as ElementIds from "../constants/element-ids"

export function showCreateLobbyView(): CreateLobbyView {
    return new CreateLobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, (playerName: string) => {
        const lobbyId = "1"
        showLobbyView(lobbyId)
    })
}