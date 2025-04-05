import { JoinLobbyView } from "../views/JoinLobbyView";
import { showLobbyView } from "./show-lobby-view";
import * as ElementIds from "../constants/element-ids"
import { joinLobby } from "../grpc/client";
import { Session } from "../models/Session";
import { saveSession } from "../store/store";

export function showJoinLobbyView(): JoinLobbyView {
    return new JoinLobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, async (lobbyId: string, playerName: string) => {
        try {
            const [lobby, player] = await joinLobby(lobbyId, playerName)
            const session = new Session(crypto.randomUUID(), player, lobby, null)
            saveSession(session)
            showLobbyView()
        } catch (error) {
            console.log("An error occurred:", error)
        }
    })
}
