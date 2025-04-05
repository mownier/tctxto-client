import { TicTacToeClient } from "./TctxtoServiceClientPb"
import { CreateLobbyRequest, JoinLobbyRequest } from "./tctxto_pb"
import * as GrpcConst from "../constants/grpc"
import { Player } from "../models/Player"
import { Lobby } from "../models/Lobby"

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
