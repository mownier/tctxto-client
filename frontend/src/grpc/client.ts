import { TicTacToeClient } from "./TctxtoServiceClientPb"
import * as GrpcConst from "../constants/grpc"

function newClient(): TicTacToeClient {
    return new TicTacToeClient(`${GrpcConst.GRPC_WEB_PROXY_HOST}:${GrpcConst.GRPC_WEB_PROXY_PORT}`)
}

