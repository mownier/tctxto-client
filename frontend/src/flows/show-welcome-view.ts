import { WelcomeView } from "../views/WelcomeView"
import * as ElementIds from "../constants/element-ids"
import { showCreateLobbyView } from "./show-create-lobby-view"

export function showWelcomeView(): WelcomeView {
    return new WelcomeView(ElementIds.MAIN_ROOT_CONTENT_ID, showCreateLobbyView, showCreateLobbyView)
}
