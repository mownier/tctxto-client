// import * as grpc from '@grpc/grpc-js'
// import * as tctxto_pb from './tctxto_pb'
// import { GRPC_SERVER_HOST, GRPC_SERVER_PORT } from '../constants/grpc'
// const { TicTacToeClient } = require('./tctxto_grpc_pb')

// export function createLobby(playerName: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//         const client = new TicTacToeClient(`${GRPC_SERVER_HOST}:${GRPC_SERVER_PORT}`, grpc.ChannelCredentials.createInsecure())
//         const request = new tctxto_pb.server.CreateLobbyRequest()
//         request.setPlayerName(playerName)

//         client.createLobby(request).then((response: tctxto_pb.server.CreateLobbyReply) => {
//             const lobbyId = response.getLobbyId()
//             console.log('Lobby ID:', lobbyId)
//             console.log('Player ID:', response.getPlayerId())
//             resolve(lobbyId)
//             client.close()
//         }).catch((err: any) => {
//             console.error('Error:', err)
//             reject(err)
//             client.close()
//         })
//     })
// }

export function createLobby(playerName: string): Promise<string> {
    return new Promise((resolve, _) => {
        resolve("1")
    })
}