import { TicTacToeClient } from "./TctxtoServiceClientPb"
import { CreateGameRequest, CreateLobbyRequest, GameCreatedUpdate, GameUpdateSubscription, JoinLobbyRequest, LobbySubscription, GameUpdate, MoveRequest } from "./tctxto_pb"
import * as GrpcConst from "../constants/grpc"
import { Player } from "../models/Player"
import { Lobby } from "../models/Lobby"
import { Game } from "../models/Game"
import { ClientReadableStream } from "grpc-web"

let gameCreationStreams: Map<string, Map<string, ClientReadableStream<GameCreatedUpdate>>> = new Map()
let gameUpdateStreams: Map<string, Map<string, ClientReadableStream<GameUpdate>>> = new Map()

function newClient(): TicTacToeClient {
    return new TicTacToeClient(`${GrpcConst.GRPC_WEB_PROXY_HOST}:${GrpcConst.GRPC_WEB_PROXY_PORT}`)
}

export function createLobby(playerName: string): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
        const client = newClient()
        const request = new CreateLobbyRequest()
        request.setPlayername(playerName)
        client.createLobby(request, {}, (err, response) => {
            if (err) {
                reject(err)
                return
            }
            if (response) {
                resolve([response.getLobbyid(), response.getPlayerid()])
                return
            }
            reject(new Error("response is nil when creating lobby"))
        })
    })
}

export function joinLobby(lobbyId: string, playerName: string): Promise<[Lobby, Player]> {
    return new Promise((resolve, reject) => {
        const client = newClient()
        const request = new JoinLobbyRequest()
        request.setLobbyid(lobbyId)
        request.setPlayername(playerName)
        client.joinLobby(request, {}, (err, response) => {
            if (err) {
                reject(err)
                return
            }
            if (response) {
                const lobby = new Lobby(lobbyId)
                const player = new Player(response.getPlayerid(), playerName)
                resolve([lobby, player])
            }
            reject(new Error("response is nil when joining lobby"))
        })
    })
}

export function subscribeGameCreatedUpdates(lobbyId: string, playerId: string, notify: (game: Game) => void) {
    const client = newClient()
    const request = new LobbySubscription()
    request.setLobbyid(lobbyId)
    request.setPlayerid(playerId)

    console.log(`[STREAM] client.subscribeToGameCreation BEFORE for lobbyId=${lobbyId}, playerId=${playerId}`)
    const stream = client.subscribeToGameCreation(request, {})
    console.log(`[STREAM] client.subscribeToGameCreation AFTER for lobbyId=${lobbyId}, playerId=${playerId}`)

    if (!gameCreationStreams.get(lobbyId)) {
        console.log(`[STREAM] Creating player-stream map for lobbyId=${lobbyId}, playerId=${playerId}`)
        gameCreationStreams.set(lobbyId, new Map())
    } else {
        console.log(`[STREAM] Player-stream map already exists for lobbyId=${lobbyId}, playerId=${playerId}`)
    }

    gameCreationStreams.get(lobbyId)?.set(playerId, stream)
    console.log(`[STREAM] Stream stored for lobbyId=${lobbyId}, playerId=${playerId}`)

    stream.on('data', (update) => {
        try {
            const gameId = update.getGameid()
            if (!gameId) {
                //console.log("game created update: ping only", update)
                return
            }
            const game = new Game(gameId, update.getPlayer1id(), update.getPlayer2id())
            notify(game)
            console.log("a game is created", gameId)
        } catch (error) {
            console.error(`[STREAM] Error in data handler for lobbyId=${lobbyId}, playerId=${playerId}:`, error)
            if (error instanceof Error) {
                console.error(error.stack)
            } else {
                console.error("Error is not an instance of Error, no stack trace available.")
            }
            stream.cancel()
        }
    });

    stream.on('end', () => {
        console.log(`[STREAM] Stream ended for lobbyId=${lobbyId}, playerId=${playerId}`)
        removeGameCreationStream(lobbyId, playerId)
    });

    stream.on('error', (err) => {
        console.error(`[STREAM] Stream error for lobbyId=${lobbyId}, playerId=${playerId}:`, err)
        console.error(err.stack)
        removeGameCreationStream(lobbyId, playerId)
        console.log(`[STREAM] Re-subscribe game created updates for lobbyId=${lobbyId}, playerId=${playerId}`)
        subscribeGameCreatedUpdates(lobbyId, playerId, notify)
    });
}

export function createGame(lobbyId: string, player1Id: string, player2Id: string) {
    const client = newClient()
    const request = new CreateGameRequest()
        .setLobbyid(lobbyId)
        .setPlayer1id(player1Id)
        .setPlayer2id(player2Id)
    client.createGame(request, null)
}

export function removeGameCreationStream(lobbyId: string, playerId: string) {
    const lobbyStreams = gameCreationStreams.get(lobbyId);
    if (lobbyStreams) {
        const stream = lobbyStreams.get(playerId)
        if (stream) {
            stream.removeListener('error', () => {})
            stream.removeListener('end', () => {})
            stream.removeListener('data', () => {})
            stream.cancel()
            lobbyStreams.delete(playerId)
            console.log(`[STREAM] Stream removed for lobbyId=${lobbyId}, playerId=${playerId}`)
        }
        if (lobbyStreams.size === 0) {
            gameCreationStreams.delete(lobbyId);
            console.log(`[STREAM] Lobby map removed for lobbyId=${lobbyId}`);
        }
    } else {
        console.log(`[STREAM] Attempted to remove stream, but lobby map not found for lobbyId=${lobbyId}`);
    }
}

export function subscribeGameUpdates(gameId: string, playerId: string, notify: (update: GameUpdate) => void) {
    const client = newClient()
    const request = new GameUpdateSubscription()
    request.setGameid(gameId)
    request.setPlayerid(playerId)

    console.log(`[STREAM] client.subscribeGameUpdates BEFORE for gameId=${gameId}, playerId=${playerId}`)
    const stream = client.subscribeGameUpdates(request, {})
    console.log(`[STREAM] client.subscribeGameUpdates AFTER for gameId=${gameId}, playerId=${playerId}`)

    if (!gameUpdateStreams.get(gameId)) {
        console.log(`[STREAM] Creating player-stream map for gameId=${gameId}, playerId=${playerId}`)
        gameUpdateStreams.set(gameId, new Map())
    } else {
        console.log(`[STREAM] Player-stream map already exists for gameId=${gameId}, playerId=${playerId}`)
    }

    gameUpdateStreams.get(gameId)?.set(playerId, stream)
    console.log(`[STREAM] Stream stored for gameId=${gameId}, playerId=${playerId}`)

    stream.on('data', (update) => {
        try {
            const gId = update.getGameid()
            if (!gId) {
                //console.log("game update: ping only", update)
                return
            }
            console.log("game update OK received", gameId)
            notify(update)
        } catch (error) {
            console.error(`[STREAM] Error in data handler for gameId=${gameId}, playerId=${playerId}:`, error)
            if (error instanceof Error) {
                console.error(error.stack)
            } else {
                console.error("Error is not an instance of Error, no stack trace available.")
            }
            stream.cancel()
        }
    })

    stream.on('end', () => {
        console.log(`[STREAM] Stream ended for gameId=${gameId}, playerId=${playerId}`)
        removeGameUpdateStream(gameId, playerId)
    })

    stream.on('error', (err) => {
        console.error(`[STREAM] Stream error for gameId=${gameId}, playerId=${playerId}:`, err)
        console.error(err.stack)
        removeGameUpdateStream(gameId, playerId)
        console.log(`[STREAM] Re-subscribe game updates for gameId=${gameId}, playerId=${playerId}`)
        subscribeGameUpdates(gameId, playerId, notify)
    })
}

export function removeGameUpdateStream(gameId: string, playerId: string) {
    const gameStreams = gameUpdateStreams.get(gameId);
    if (gameStreams) {
        const stream = gameStreams.get(playerId)
        if (stream) {
            stream.removeListener('error', () => {})
            stream.removeListener('end', () => {})
            stream.removeListener('data', () => {})
            stream.cancel()
            gameStreams.delete(playerId)
            console.log(`[STREAM] Stream removed for gameId=${gameId}, playerId=${playerId}`)
        }
        if (gameStreams.size === 0) {
            gameUpdateStreams.delete(gameId);
            console.log(`[STREAM] Game map removed for gameId=${gameId}`);
        }
    } else {
        console.log(`[STREAM] Attempted to remove stream, but game map not found for gameId=${gameId}`);
    }
}

export function makeMove(gameId: string, position: number, playerId: string) {
    console.log(`[STREAM] Make move for gameId=${gameId}, playerId=${playerId}, position=${position}`)
    const client = newClient()
    const request = new MoveRequest()
        .setGameid(gameId)
        .setPlayerid(playerId)
        .setPosition(position)
    client.makeMoke(request, {})
}
