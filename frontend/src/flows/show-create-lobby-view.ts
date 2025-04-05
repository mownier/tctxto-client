import { CreateLobbyView } from '../views/CreateLobbyView'
import { showLobbyView } from './show-lobby-view'
import * as ElementIds from "../constants/element-ids"
import { createLobby } from '../grpc/client'
import { Lobby } from '../models/Lobby'
import { Player } from '../models/Player'
import { Session } from '../models/Session'
import { saveSession } from '../store/store'

export function showCreateLobbyView(): CreateLobbyView {
    return new CreateLobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, async (playerName: string) => {
        try {
            const [lobbyId, playerId] = await createLobby(playerName)
            const lobby = new Lobby(lobbyId)
            const player = new Player(playerId, playerName)
            const session = new Session(crypto.randomUUID(), player, lobby, null)
            saveSession(session)
            showLobbyView()
        } catch (error) {
            console.log("An error occurred:", error)
        }
    })
}