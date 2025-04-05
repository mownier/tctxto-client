import { TicTacToeClient } from "./TctxtoServiceClientPb"
import { CreateLobbyRequest } from "./tctxto_pb"
import * as GrpcConst from "../constants/grpc"

export function createLobby(playerName: string): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
        const client = new TicTacToeClient(`${GrpcConst.GRPC_WEB_PROXY_HOST}:${GrpcConst.GRPC_WEB_PROXY_PORT}`)
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