import { TicTacToeClient } from './TctxtoServiceClientPb';
import * as GrpcConst from "../constants/grpc"
import { ClientUpdate, NavigationPath, NavigationUpdate, ServerUpdate, SignInRequest, SignUpRequest, SignOutRequest, CreateLobbyRequest, Lobby, Empty, Player, JoinLobbyRequest, LeaveMyLobbyRequest, CreateGameRequest, MakeMoveRequest, Mover, Move, Technicality, RematchRequest } from "./tctxto_pb"
import { ClientReadableStream, Metadata } from "grpc-web"

const CLIENT_ID_STORAGE_KEY: string = 'TicTacToeClient_clientId'
const SUBSCRIBE_MAX_ATTEMPTS: number = 3

let subscribeAttempts: number = 0
let stream: ClientReadableStream<ServerUpdate> | null = null
let latestData: LatestData = {
    path: null,
    lobby: null,
    playerDisplayName: '',
    gameStatus: null
}

function resetLatestData(): void {
    latestData.lobby = null
    latestData.playerDisplayName = ''
}

export function getLatestData(): LatestData {
    return latestData
}

export interface GameStatus {
    you: Mover
    youMove: boolean | null,
    move: Move | null,
    youWin: boolean | null
    winTechnicality: Technicality | null
    draw: string | null
}

export interface LatestData {
    path: NavigationPath | null
    lobby: Lobby | null
    playerDisplayName: string
    gameStatus: GameStatus | null
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
    joinLobbyNotOkay(): void
    leaveMyLobbyNotOkay(): void
    someoneJoinedMyLobby(id: string, name: string): void
    someoneLeftMyLobby(id: string): void
    createGameNotOkay(): void
    makeMoveNotOkay(): void
    gameStarted(): void
    nextMoverDetermined(): void
    moveUpdated(): void
    winnerDetermined(): void
    noOneWins(): void
    rematchNotOkay(): void
    showRematchWaitingRoom(): void
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

    joinLobbyNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    leaveMyLobbyNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    someoneJoinedMyLobby(id: string, name: string): void {
        throw new Error("Method not implemented.")
    }

    someoneLeftMyLobby(id: string): void {
        throw new Error("Method not implemented.")
    }

    createGameNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    makeMoveNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    gameStarted(): void {
        throw new Error("Method not implemented.")
    }

    nextMoverDetermined(): void {
        throw new Error("Method not implemented.")
    }

    moveUpdated(): void {
        throw new Error("Method not implemented.")
    }

    winnerDetermined(): void {
        throw new Error("Method not implemented.")
    }

    noOneWins(): void {
        throw new Error("Method not implemented.")
    }

    rematchNotOkay(): void {
        throw new Error("Method not implemented.")
    }

    showRematchWaitingRoom(): void {
        throw new Error("Method not implemented.")
    }
}

let clientCallback: ClientCallback = new ClientCallbackDefaultImp()

export function setClientCallback(value: ClientCallback) {
    clientCallback = value
}

function createClient(): TicTacToeClient {
    return new TicTacToeClient(GrpcConst.GRPC_WEB_PROXY_ORIGIN)
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

export async function joinLobby(lobbyId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new JoinLobbyRequest()
            request.setLobbyId(lobbyId)
            update.setJoinLobbyRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.joinLobbyNotOkay()
            reject(error)
        }
    })
}

export async function leaveMyLobby(): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new LeaveMyLobbyRequest()
            update.setLeaveMyLobbyRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.leaveMyLobbyNotOkay()
            reject(error)
        }
    })
}

export async function createGame(player1Id: string, player2Id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new CreateGameRequest()
            request.setPlayer1Id(player1Id)
            request.setPlayer2Id(player2Id)
            update.setCreateGameRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.createGameNotOkay()
            reject(error)
        }
    })
}

export async function makeMove(position: number): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new MakeMoveRequest()
            request.setPosition(position)
            update.setMakeMoveRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.makeMoveNotOkay()
            reject(error)
        }
    })
}

export async function rematch(yes: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const update = new ClientUpdate()
            const request = new RematchRequest()
            request.setYes(yes)
            update.setRematchRequest(request)
            const client = createClient()
            client.notify(update, metadataWithClientId())
            resolve()
        } catch (error) {
            clientCallback.rematchNotOkay()
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
        case ServerUpdate.TypeCase.JOIN_LOBBY_REPLY:
            if (update.getJoinLobbyReply()) {
                if (update.getJoinLobbyReply()!.getOutcome()) {
                    if (!update.getJoinLobbyReply()!.getOutcome()!.getOk()) {
                        clientCallback.joinLobbyNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.LEAVE_MY_LOBBY_REPLY:
            if (update.getLeaveMyLobbyReply()) {
                if (update.getLeaveMyLobbyReply()!.getOutcome()) {
                    if (update.getLeaveMyLobbyReply()!.getOutcome()!.getOk()) {
                        latestData.lobby = null
                    } else {
                        clientCallback.leaveMyLobbyNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.MY_LOBBY_JOINER_UPDATE:
            if (update.getMyLobbyJoinerUpdate()) {
                if (update.getMyLobbyJoinerUpdate()!.getPlayer()) {
                    if (latestData.lobby) {
                        const playerJoinedLobby = update.getMyLobbyJoinerUpdate()!.getPlayer()!
                        addPlayerToLobby(latestData.lobby!, playerJoinedLobby)
                        clientCallback.someoneJoinedMyLobby(playerJoinedLobby.getId(), playerJoinedLobby.getName())
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.MY_LOBBY_LEAVER_UPDATE:
            if (update.getMyLobbyLeaverUpdate()) {
                if (update.getMyLobbyLeaverUpdate()!.getPlayer()) {
                    if (latestData.lobby) {
                        const playerLeftLobby = update.getMyLobbyLeaverUpdate()!.getPlayer()!
                        removeLobbyPlayerById(latestData.lobby!, playerLeftLobby.getId())
                        clientCallback.someoneLeftMyLobby(playerLeftLobby.getId())
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.CREATE_GAME_REPLY:
            if (update.getCreateGameReply()) {
                if (update.getCreateGameReply()!.getOutcome()) {
                    if (!update.getCreateGameReply()!.getOutcome()!.getOk()) {
                        clientCallback.createGameNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.MAKE_MOVE_REPLY:
            if (update.getMakeMoveReply()) {
                if (update.getMakeMoveReply()!.getOutcome()) {
                    if (!update.getMakeMoveReply()!.getOutcome()!.getOk()) {
                        clientCallback.makeMoveNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.GAME_START_UPDATE:
            if (update.getGameStartUpdate()) {
                if (update.getGameStartUpdate()) {
                    const gameStartUpdate = update.getGameStartUpdate()!
                    console.log(`gameStatus is null ? ${latestData.gameStatus === null}`)
                    if (!latestData.gameStatus) {
                        latestData.gameStatus = {
                            you: gameStartUpdate.getYou(),
                            youMove: null,
                            move: null,
                            youWin: null,
                            winTechnicality: null,
                            draw: null
                        }
                        console.log(`gameStatus is null ? YES, gameStarted called`)
                        clientCallback.gameStarted()
                        return
                    }
                    console.log(`gameStatus is null ? NO`)
                    if (latestData.gameStatus!.you !== gameStartUpdate.getYou()) {
                        latestData.gameStatus!.you = gameStartUpdate.getYou()
                        console.log(`gameStatus is null ? NO, gameStarted called`)
                        clientCallback.gameStarted()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.NEXT_MOVER_UPDATE:
            if (update.getNextMoverUpdate()) {
                if (latestData.gameStatus) {
                    const youMove = update.getNextMoverUpdate()!.getYou()
                    if (youMove !== latestData.gameStatus.youMove) {
                        latestData.gameStatus!.youMove = youMove
                        clientCallback.nextMoverDetermined()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.MOVE_UPDATE:
            if (update.getMoveUpdate()) {
                if (update.getMoveUpdate()!.getMove()) {
                    if (latestData.gameStatus) {
                        const move = update.getMoveUpdate()!.getMove()!
                        if (move !== latestData.gameStatus.move) {
                            latestData.gameStatus.move = move
                            clientCallback.moveUpdated()
                        }
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.WINNER_UPDATE:
            if (update.getWinnerUpdate()) {
                if (latestData.gameStatus) {
                    const winnerUpdate = update.getWinnerUpdate()!
                    if (latestData.gameStatus.youWin != winnerUpdate.getYou() ||
                        latestData.gameStatus.winTechnicality != winnerUpdate.getTechnicality()) {
                        latestData.gameStatus.winTechnicality = winnerUpdate.getTechnicality()
                        latestData.gameStatus.youWin = winnerUpdate.getYou()
                        clientCallback.winnerDetermined()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.DRAW_UPDATE:
            if (update.getDrawUpdate()) {
                if (latestData.gameStatus) {
                    if (!latestData.gameStatus.draw) {
                        latestData.gameStatus.draw = ''
                        clientCallback.noOneWins()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.REMATCH_REPLY:
            if (update.getRematchReply()) {
                if (update.getRematchReply()!.getOutcome()) {
                    if (!update.getRematchReply()!.getOutcome()!.getOk()) {
                        clientCallback.rematchNotOkay()
                    }
                }
            }
            break
        case ServerUpdate.TypeCase.REMATCH_APPROVED:
            latestData.gameStatus = null
            latestData.path = null
            break
        case ServerUpdate.TypeCase.REMATCH_DENIED:
            latestData.gameStatus = null
            latestData.path = null
            break
        case ServerUpdate.TypeCase.REMATCH_PENDING:
            break
    }
}

function addPlayerToLobby(lobby: Lobby, newPlayer: Player): boolean {
    const currentPlayers = lobby.getPlayersList()
    // Check if the player with the same ID already exists in the lobby
    const playerExists = currentPlayers.some(player => player.getId() === newPlayer.getId())

    if (!playerExists) {
        const updatedPlayers = [...currentPlayers, newPlayer]
        lobby.setPlayersList(updatedPlayers)
        return true // Player was added successfully
    } else {
        return false // Player with the same ID already exists
    }
}


function removeLobbyPlayerById(lobby: Lobby, playerIdToRemove: string): boolean {
    const initialPlayers = lobby.getPlayersList()
    const updatedPlayers = initialPlayers.filter(player => player.getId() !== playerIdToRemove)

    if (updatedPlayers.length < initialPlayers.length) {
        lobby.setPlayersList(updatedPlayers)
        return true // Player was found and removed
    } else {
        return false // Player with the given ID was not found
    }
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

function deepCompareLobby(lobby1: Lobby | null, lobby2: Lobby | null): boolean {
    if (lobby1 === lobby2) {
        return true
    }
    if (!lobby1 || !lobby2) {
        return false
    }

    if (lobby1.getName() !== lobby2.getName()) {
        return false
    }

    const players1 = lobby1.getPlayersList()
    const players2 = lobby2.getPlayersList()

    if (players1.length !== players2.length) {
        return false
    }

    const players2Map = new Map<string, Player>()
    for (const player of players2) {
        players2Map.set(player.getId(), player)
    }

    for (const player1 of players1) {
        const matchingPlayer2 = players2Map.get(player1.getId())
        if (!matchingPlayer2 || !deepComparePlayer(player1, matchingPlayer2)) {
            return false
        }
    }

    return true
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
            latestData.gameStatus = null
            latestData.lobby = null
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
            latestData.gameStatus = null
            clientCallback.showMyLobby()
            break
        case NavigationPath.REMATCH:
            latestData.gameStatus = null
            clientCallback.showRematchWaitingRoom()
            break
    }
}
