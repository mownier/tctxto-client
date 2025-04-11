import { setLocaleAutomatically } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'
import { NoSessionHeaderView } from './views/NoSessionHeaderView'
import { WelcomeView } from './views/WelcomeView'
import { exchange } from './grpc/client'

async function main() {
    try {
        await setLocaleAutomatically()
    } catch (error) {
        console.error("locale not set automatically:", error)
    }
    
    const mainRootElement = document.getElementById(ElementIds.MAIN_ROOT_ID) as HTMLElement

    if (!mainRootElement) {
        console.error("main root not found")
        return
    }

    const mainRootView = new MainRootView(mainRootElement)
    const mainRootHeaderElement = document.getElementById(ElementIds.MAIN_ROOT_HEADER_ID) as HTMLElement
    const mainRootContentElement = document.getElementById(ElementIds.MAIN_ROOT_CONTENT_ID) as HTMLElement

    if (!mainRootHeaderElement) {
        console.error("main root header not found")
        return
    }

    let ok: boolean

    try {
        exchange()
        ok = true
    } catch (error) {
        console.error("exchange error:", error)
        ok = false
    }

    if (!ok) {
        const noSessionHeaderView = new NoSessionHeaderView(mainRootHeaderElement)
        const welcomeView = new WelcomeView(mainRootContentElement)
        return
    }

    mainRootContentElement.innerHTML = '<h1>Wee</h1>'
}

main()
