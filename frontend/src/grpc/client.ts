import { TicTacToeClient } from './TctxtoServiceClientPb';
import * as GrpcConst from "../constants/grpc"
import { ClientUpdate, NavigationPath, NavigationUpdate, ServerUpdate, SignInRequest, SignUpRequest, SignOutRequest, CreateLobbyRequest, Lobby, Empty, Player } from "./tctxto_pb"
import { ClientReadableStream, Metadata } from "grpc-web"

const CLIENT_ID_STORAGE_KEY: string = 'TicTacToeClient_clientId'
const SUBSCRIBE_MAX_ATTEMPTS: number = 3

let subscribeAttempts: number = 0
let stream: ClientReadableStream<ServerUpdate> | null = null
let latestData: LatestData = {
    path: null,
    lobby: null,
    playerDisplayName: ''
}

function resetLatestData(): void {
    latestData.lobby = null
    latestData.playerDisplayName = ''
}

export function getLatestData(): LatestData {
    return latestData
}

export interface LatestData {
    path: NavigationPath | null
    lobby: Lobby | null
    playerDisplayName: string
}

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
    createLobbyNotOkay(): void
    displayMyLobbyDetails(lobby: Lobby): void
    updatePlayerDisplayName(name: string): void
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
        throw new Error("Method not implemented.")
    }

    signOutNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    showRefreshPage(): void {
        throw new Error("Method not implemented.")
    }

    playerUsingOtherClient(message: string): void {
        throw new Error("Method not implemented.")
    }

    createLobbyNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    displayMyLobbyDetails(lobby: Lobby): void {
        throw new Error("Method not implemented.")
    }

    updatePlayerDisplayName(name: string): void {
        throw new Error("Method not implemented.")
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

export async function subscribe(): Promise<void> {
    return new Promise((resolve, _) => {
        const client = createClient()
        stream = client.subscribe(new Empty(), subscribeMetdata())
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

export async function createLobby(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new CreateLobbyRequest()
            request.setName(name)
            update.setCreateLobbyRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.createLobbyNotOkay()
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
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.PLAYER_CLIENT_UPDATE:
            if (update.getPlayerClientUpdate()) {
                clientCallback.playerUsingOtherClient(update.getPlayerClientUpdate()!.getMessage())
            }
            break
        case ServerUpdate.TypeCase.PLAYER_DISPLAY_NAME_UPDATE:
            if (update.getPlayerDisplayNameUpdate()) {
                latestData.playerDisplayName = update.getPlayerDisplayNameUpdate()!.getDisplayname()
                clientCallback.updatePlayerDisplayName(latestData.playerDisplayName)
            }
            break
        case ServerUpdate.TypeCase.CREATE_LOBBY_REPLY:
            if (update.getCreateLobbyReply()) {
                if (update.getCreateLobbyReply()!.getOutcome()) {
                    if (!update.getCreateLobbyReply()!.getOutcome()!.getOk()) {
                        clientCallback.createLobbyNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.MY_LOBBY_DETAILS:
            if (update.getMyLobbyDetails()) {
                if (update.getMyLobbyDetails()!.getLobby()) {
                    if (!deepCompareLobby(latestData.lobby, update.getMyLobbyDetails()!.getLobby()!)) {
                        latestData.lobby = update.getMyLobbyDetails()!.getLobby()!
                        clientCallback.displayMyLobbyDetails(latestData.lobby!)
                    }
                }
            }
            break
    }
}

function deepCompareLobby(lobby1: Lobby | null, lobby2: Lobby | null): boolean {
    if (lobby1 === lobby2) {
        return true // Both are null or the same object reference
    }
    if (!lobby1 || !lobby2) {
        return false // One is null and the other isn't
    }
    if (lobby1.getName() !== lobby2.getName()) {
        return false
    }
    if (lobby1.getPlayersList().length !== lobby2.getPlayersList().length) {
        return false
    }
    for (let i = 0; i < lobby1.getPlayersList().length; i++) {
        if (!deepComparePlayer(lobby1.getPlayersList()[i] || null, lobby2.getPlayersList()[i] || null)) {
            return false
        }
    }
    return true
}

function deepComparePlayer(player1: Player | null, player2: Player | null): boolean {
    if (player1 === player2) {
        return true // Both are null or the same object reference
    }
    if (!player1 || !player2) {
        return false // One is null and the other isn't
    }
    return player1.getId() === player2.getId() && player1.getName() === player2.getName()
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
        subscribe()
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
        subscribe()
        return
    }
    clientCallback.showRefreshPage()
}

function handleNavigationUpdate(update: NavigationUpdate) {
    if (latestData.path === update.getPath()) {
        return
    }
    latestData.path = update.getPath()
    switch (update.getPath()) {
        case NavigationPath.GAME:
            clientCallback.showGame()
            break
        case NavigationPath.HOME:
            clientCallback.showHome()
            break
        case NavigationPath.WELCOME:
            resetLatestData()
            clientCallback.showWelcome()
            break
        case NavigationPath.MY_LOBBY:
            clientCallback.showMyLobby()
            break
    }
}
