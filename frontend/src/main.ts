import { setLocale } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'
import { showWelcomeView } from './flows/show-welcome-view'

async function main() {
    await setLocale("fil")
    new MainRootView(ElementIds.MAIN_ROOT_ID)
    showWelcomeView()
}

main()
