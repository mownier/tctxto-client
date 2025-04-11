import { TicTacToeClient } from "./TctxtoServiceClientPb"
import * as GrpcConst from "../constants/grpc"
import { ExchangeRequest } from "./tctxto_pb"

const CLIENT_ID_STORAGE_KEY = 'TicTacToeClient_clientId'

function createClient(): TicTacToeClient {
    return new TicTacToeClient(`${GrpcConst.GRPC_WEB_PROXY_HOST}:${GrpcConst.GRPC_WEB_PROXY_PORT}`)
}

function storeClientId(clientId: string): void {
    sessionStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId)
}

function getClientId(): string {
    return sessionStorage.getItem(CLIENT_ID_STORAGE_KEY) || ''
}

export async function exchange(): Promise<void> {
    if (getClientId().length > 0) {
        return
    }

    const client = createClient()
    const request = new ExchangeRequest()
    request.setPublicKey(GrpcConst.GRPC_SERVER_PK)

    let clientId: string

    try {
        const reply = await client.exchange(request)
        clientId = reply.getClientId()
        if (!clientId) {
            throw new Error("client ID is empty in exchange reply.")
        }
    } catch (error) {
        console.error("errror during client ID exchange:", error)
        throw error
    }

    storeClientId(clientId)
}