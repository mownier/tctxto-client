import { setLocaleAutomatically } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'
import { showWelcomeView } from './flows/show-welcome-view'
import { Session } from './models/Session'
import { getSession, removeSession } from './store/store'
import { showLobbyView } from './flows/show-lobby-view'
import { MainRooHeaderView } from './views/MainRootHeaderView'
import { subscribeGameCreatedUpdates } from './grpc/client'
import { Game } from './models/Game'

async function main() {
    await setLocaleAutomatically()
    new MainRootView(ElementIds.MAIN_ROOT_ID)
    new MainRooHeaderView(ElementIds.MAIN_ROOT_HEADER_ID, () => {
        removeSession()
        showWelcomeView()
    })
    let session: Session | null
    try {
        session = getSession()
    } catch (error) {
        session = null
    }
    if (session) {
        showLobbyView()
        return
    }
    showWelcomeView()
}

main()
