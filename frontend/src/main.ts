import { setLocale } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import { showCreateLobbyView } from './flows/show-create-lobby-view'
import * as ElementIds from './constants/element-ids'

async function main() {
    await setLocale("fil")
    new MainRootView(ElementIds.MAIN_ROOT_ID)
    showCreateLobbyView()
}

main()
