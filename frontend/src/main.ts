import { LocalizableElement, renderLocalizedTexts, setLocaleAutomatically } from './localization/localization'
import { MainRootView } from './views/MainRootView'
import * as ElementIds from './constants/element-ids'
import { NoSessionHeaderView } from './views/NoSessionHeaderView'
import { WelcomeView } from './views/WelcomeView'
import { ClientCallback, getPlayerDisplayName, setClientCallback, signIn, signOut, signUp, subscribe } from './grpc/client'
import { WithSessionHeaderView } from './views/WithSessionHeaderView'
import { EmptytView } from './views/EmptyView'
import { HomeView } from './views/HomeView'
import { MyLobbyView } from './views/MyLobbyView'
import { ErrorView } from './views/ErrorView'
import { SubscriptionAction } from './grpc/tctxto_pb'

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

    const clientCallback = new MyClientCallback(mainRootElement, mainRootHeaderElement, mainRootContentElement)
    setClientCallback(clientCallback)

    try {
        await subscribe(SubscriptionAction.INITIAL)
    } catch {
        const errorView = new ErrorView(mainRootElement, "Please refresh page")
    }
}

class MyClientCallback implements ClientCallback {
    private mainRootElement: HTMLElement
    private mainRootContentElement: HTMLElement
    private mainRootHeaderElement: HTMLElement

    constructor(
        mainRootElement: HTMLElement,
        mainRootHeaderElement: HTMLElement,
        mainRootContentElement: HTMLElement
    ) {
        this.mainRootElement = mainRootElement
        this.mainRootHeaderElement = mainRootHeaderElement
        this.mainRootContentElement = mainRootContentElement
    }

    showHome(): void {
        const headerView = this.newWithSessionHeaderView()
        const contentView = new HomeView(this.mainRootContentElement)
            .setCreateLobbyCallback((lobbyNmae: string) => {
                console.log("lobby name to create:", lobbyNmae)
            })
            .setJoinLobbyCallback((lobbyId: string) => {
                console.log("lobby id to join:", lobbyId)
            })
    }

    showWelcome(): void {
        const headerView = new NoSessionHeaderView(this.mainRootHeaderElement)
            .setSignInCallback(async (name: string, pass: string) => {
                try {
                    await signIn(name, pass)
                } catch {
                    new ErrorView(this.mainRootContentElement, "Encountered error while signing in. Please try again.")
                }
            })
            .setSignUpCallback(async (name: string, pass: string) => {
                try {
                    await signUp(name, pass)
                } catch {
                    new ErrorView(this.mainRootContentElement, "Encountered error while signing up. Please try again.")
                }
            })
        const contentView = new WelcomeView(this.mainRootContentElement)
    }

    showGame(): void {
        const headerView = new EmptytView(this.mainRootHeaderElement)
        const contentView = new EmptytView(this.mainRootContentElement)
    }

    showMyLobby(): void {
        const headerView = this.newWithSessionHeaderView()
        const contentView = new MyLobbyView(this.mainRootContentElement)
    }

    signUpNotOkay(): void {
        const element = document.getElementById(ElementIds.NO_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: "Encountered error while signing up. Please try again." },
        ]
        renderLocalizedTexts(localizableElements)
    }

    signInNotOkay(): void {
        const element = document.getElementById(ElementIds.NO_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: "Encountered error while signing in. Please try again." },
        ]
        renderLocalizedTexts(localizableElements)
    }

    signOutNotOkay(): void {

    }

    showRefreshPage(): void {
        const errorView = new ErrorView(this.mainRootElement, "Please refresh page")
    }

    playerUsingOtherClient(message: string): void {
        const element = document.getElementById(ElementIds.NO_SESSION_STATUS_ID)
        if (!element) {
            return
        }
        const localizableElements: LocalizableElement[] = [
            { element: element, key: message },
        ]
        renderLocalizedTexts(localizableElements)
    }

    private newWithSessionHeaderView(): WithSessionHeaderView {
        return new WithSessionHeaderView(this.mainRootHeaderElement, getPlayerDisplayName())
            .setSignOutCallback(async () => {
                try {
                    await signOut()
                } catch {
                    new ErrorView(this.mainRootContentElement, "Encountered error while signing out. Please try again.")
                }
            })
    }
}

main()
