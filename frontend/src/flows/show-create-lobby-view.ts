import { CreateLobbyView } from '../views/CreateLobbyView'
import { showLobbyView } from './show-lobby-view'
import * as ElementIds from "../constants/element-ids"
import { createLobby } from '../grpc/client'

export function showCreateLobbyView(): CreateLobbyView {
    return new CreateLobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, async (playerName: string) => {
        try {
            const lobbyId = await createLobby(playerName)
            showLobbyView(lobbyId)
        } catch (error) {
            console.log("An error occurred:", error)
        }
    })
}