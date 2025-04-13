import { TicTacToeClient } from './TctxtoServiceClientPb';
import * as GrpcConst from "../constants/grpc"
import { ClientUpdate, NavigationPath, NavigationUpdate, ServerUpdate, SignInRequest, SignUpRequest, SubscriptionAction, SubscribeRequest, SignOutRequest } from "./tctxto_pb"
import { ClientReadableStream, Metadata } from "grpc-web"

const CLIENT_ID_STORAGE_KEY: string = 'TicTacToeClient_clientId'
const PLAYER_DISPLAY_NAME_STORAGE_KEY: string = "Player_displayName"
const SUBSCRIBE_MAX_ATTEMPTS: number = 3

let subscribeAttempts: number = 0
let stream: ClientReadableStream<ServerUpdate> | null = null

export interface ClientCallback {
    showHome(): void
    showWelcome(): void
    showGame(): void
    showMyLobby(): void
    signInNotOkay(): void
    signUpNotOkay(): void
    signOutNotOkay(): void
    showRefreshPage(): void
    playerUsingOtherClient(message: string): void
}

class ClientCallbackDefaultImp implements ClientCallback {
    showHome(): void {
        throw new Error("Method not implemented.")
    }

    showWelcome(): void {
        throw new Error("Method not implemented.")
    }

    showGame(): void {
        throw new Error("Method not implemented.")
    }

    showMyLobby(): void {
        throw new Error("Method not implemented.")
    }

    signInNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    signUpNotOkay(): void {
        throw new Error('Method not implemented.')
    }

    signOutNotOkay(): void {
        throw new Error('Method not implemented.')
    }

    showRefreshPage(): void {
        throw new Error('Method not implemented.')
    }

    playerUsingOtherClient(message: string): void {
        throw new Error('Method not implemented.')
    }
}

let clientCallback: ClientCallback = new ClientCallbackDefaultImp()

export function setClientCallback(value: ClientCallback) {
    clientCallback = value
}

function createClient(): TicTacToeClient {
    return new TicTacToeClient(`${GrpcConst.GRPC_WEB_PROXY_HOST}:${GrpcConst.GRPC_WEB_PROXY_PORT}`)
}

function storeClientId(clientId: string): void {
    sessionStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId)
}

function getClientId(): string {
    return sessionStorage.getItem(CLIENT_ID_STORAGE_KEY) || ''
}

function storePlayerDisplayName(displayName: string): void {
    sessionStorage.setItem(PLAYER_DISPLAY_NAME_STORAGE_KEY, displayName)
}

function removePlayerDisplayName(): void {
    sessionStorage.removeItem(PLAYER_DISPLAY_NAME_STORAGE_KEY)
}

export function getPlayerDisplayName(): string {
    return sessionStorage.getItem(PLAYER_DISPLAY_NAME_STORAGE_KEY) || ''
}

function metadataWithClientId(): Metadata {
    const clientId = getClientId()
    return { 'ClientId': clientId }
}

function subscribeMetdata(): Metadata {
    const clientId = getClientId()
    return {
        'ClientId': clientId,
        'PublicKey': GrpcConst.GRPC_SERVER_PK
    }
}

export async function subscribe(action: SubscriptionAction): Promise<void> {
    return new Promise((resolve, _) => {
        const client = createClient()
        const request = new SubscribeRequest()
        request.setAction(action)
        stream = client.subscribe(request, subscribeMetdata())
        stream.on('data', handleStreamData)
        stream.on('error', handleStreamError)
        stream.on('end', handleStreamEnd)
        resolve()
    })
}

export async function signUp(name: string, pass: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new SignUpRequest()
            request.setName(name)
            request.setPass(pass)
            update.setSignUpRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.signUpNotOkay()
            reject(error)
        }
    })
}

export async function signIn(name: string, pass: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new SignInRequest()
            request.setName(name)
            request.setPass(pass)
            update.setSignInRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.signUpNotOkay()
            reject(error)
        }
    })
}

export async function signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new SignOutRequest()
            update.setSignOutRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.signOutNotOkay()
            reject(error)
        }
    })
}

function handleStreamData(update: ServerUpdate) {
    console.log(`[STREAM] server update received`)
    subscribeAttempts = 0
    const typeCase = update.getTypeCase()
    switch (typeCase) {
        case ServerUpdate.TypeCase.NAVIGATION_UPDATE:
            if (update.getNavigationUpdate()) {
                handleNavigationUpdate(update.getNavigationUpdate()!)
            }
            break
        case ServerUpdate.TypeCase.CLIENT_ASSIGNMENT_UPDATE:
            if (update.getClientAssignmentUpdate()) {
                storeClientId(update.getClientAssignmentUpdate()!.getClientId())
            }
            break
        case ServerUpdate.TypeCase.SIGN_IN_REPLY:
            if (update.getSignInReply()) {
                if (update.getSignInReply()!.getOutcome()) {
                    if (!update.getSignInReply()!.getOutcome()!.getOk()) {
                        clientCallback.signInNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.SIGN_UP_REPLY:
            if (update.getSignUpReply()) {
                if (update.getSignUpReply()!.getOutcome()) {
                    if (!update.getSignUpReply()!.getOutcome()!.getOk()) {
                        clientCallback.signUpNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.SIGN_OUT_REPLY:
            if (update.getSignOutReply()) {
                if (update.getSignOutReply()!.getOutcome()) {
                    if (!update.getSignOutReply()!.getOutcome()!.getOk()) {
                        clientCallback.signOutNotOkay()
                    } else {
                        removePlayerDisplayName()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.PLAYER_CLIENT_UPDATE:
            if (update.getPlayerClientUpdate()) {
                removePlayerDisplayName()
                clientCallback.playerUsingOtherClient(update.getPlayerClientUpdate()!.getMessage())
            }
            break
        case ServerUpdate.TypeCase.PLAYER_DISPLAY_NAME_UPDATE:
            if (update.getPlayerDisplayNameUpdate()) {
                storePlayerDisplayName(update.getPlayerDisplayNameUpdate()!.getDisplayname())
            }
            break
    }
}

function handleStreamError(error: Error) {
    console.error(`[STREAM] error`)
    stream?.removeListener('data', handleStreamData)
    stream?.removeListener('end', handleStreamEnd)
    stream?.removeListener('error', handleStreamError)
    stream?.cancel()
    stream = null
    subscribeAttempts += 1
    if (subscribeAttempts < SUBSCRIBE_MAX_ATTEMPTS) {
        subscribe(SubscriptionAction.RE_SUBSCRIBE)
        return
    }
    clientCallback.showRefreshPage()
}

function handleStreamEnd() {
    console.log(`[STREAM] end`)
    stream?.removeListener('data', handleStreamData)
    stream?.removeListener('end', handleStreamEnd)
    stream?.removeListener('error', handleStreamError)
    stream?.cancel()
    stream = null
    subscribeAttempts += 1
    if (subscribeAttempts < SUBSCRIBE_MAX_ATTEMPTS) {
        subscribe(SubscriptionAction.RE_SUBSCRIBE)
        return
    }
    clientCallback.showRefreshPage()
}

function handleNavigationUpdate(update: NavigationUpdate) {
    if (!update.getRefresh()) {
        return
    }
    switch (update.getPath()) {
    case NavigationPath.GAME:
        clientCallback.showGame()
        break
    case NavigationPath.HOME:
        clientCallback.showHome()
        break
    case NavigationPath.WELCOME:
        clientCallback.showWelcome()
        break
    case NavigationPath.MY_LOBBY:
        clientCallback.showMyLobby()
        break
    }
}