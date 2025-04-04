import { JoinLobbyView } from "../views/JoinLobbyView";
import { showLobbyView } from "./show-lobby-view";
import * as ElementIds from "../constants/element-ids"

export function showJoinLobbyView(): JoinLobbyView {
    return new JoinLobbyView(ElementIds.MAIN_ROOT_CONTENT_ID, (lobbyId: string) => {
        showLobbyView(lobbyId)
    })
}