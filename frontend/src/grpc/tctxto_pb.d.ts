declare namespace tctxto_pb {
    namespace server {
        class Empty {
            serializeBinary(): Uint8Array;
            toObject(): Empty.AsObject;
            static toObject(includeInstance?: boolean, msg?: Empty): Empty.AsObject;
            static deserializeBinary(bytes: Uint8Array): Empty;
            static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
            static fromObject(obj: Empty.AsObject): Empty;
        }
        namespace Empty {
            interface AsObject {
            }
        }

        class CreateLobbyRequest {
            getPlayerName(): string;
            setPlayerName(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): CreateLobbyRequest.AsObject;
            static toObject(includeInstance?: boolean, msg?: CreateLobbyRequest): CreateLobbyRequest.AsObject;
            static deserializeBinary(bytes: Uint8Array): CreateLobbyRequest;
            static deserializeBinaryFromReader(message: CreateLobbyRequest, reader: jspb.BinaryReader): CreateLobbyRequest;
            static fromObject(obj: CreateLobbyRequest.AsObject): CreateLobbyRequest;
        }
        namespace CreateLobbyRequest {
            interface AsObject {
                playerName: string;
            }
        }

        class CreateLobbyReply {
            getLobbyId(): string;
            setLobbyId(value: string): void;
            getPlayerId(): string;
            setPlayerId(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): CreateLobbyReply.AsObject;
            static toObject(includeInstance?: boolean, msg?: CreateLobbyReply): CreateLobbyReply.AsObject;
            static deserializeBinary(bytes: Uint8Array): CreateLobbyReply;
            static deserializeBinaryFromReader(message: CreateLobbyReply, reader: jspb.BinaryReader): CreateLobbyReply;
            static fromObject(obj: CreateLobbyReply.AsObject): CreateLobbyReply;
        }
        namespace CreateLobbyReply {
            interface AsObject {
                lobbyId: string;
                playerId: string;
            }
        }

        class JoinLobbyRequest {
            getLobbyId(): string;
            setLobbyId(value: string): void;
            getPlayerName(): string;
            setPlayerName(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): JoinLobbyRequest.AsObject;
            static toObject(includeInstance?: boolean, msg?: JoinLobbyRequest): JoinLobbyRequest.AsObject;
            static deserializeBinary(bytes: Uint8Array): JoinLobbyRequest;
            static deserializeBinaryFromReader(message: JoinLobbyRequest, reader: jspb.BinaryReader): JoinLobbyRequest;
            static fromObject(obj: JoinLobbyRequest.AsObject): JoinLobbyRequest;
        }
        namespace JoinLobbyRequest {
            interface AsObject {
                lobbyId: string;
                playerName: string;
            }
        }

        class JoinLobbyReply {
            getPlayerId(): string;
            setPlayerId(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): JoinLobbyReply.AsObject;
            static toObject(includeInstance?: boolean, msg?: JoinLobbyReply): JoinLobbyReply.AsObject;
            static deserializeBinary(bytes: Uint8Array): JoinLobbyReply;
            static deserializeBinaryFromReader(message: JoinLobbyReply, reader: jspb.BinaryReader): JoinLobbyReply.AsObject;
            static fromObject(obj: JoinLobbyReply.AsObject): JoinLobbyReply;
        }
        namespace JoinLobbyReply {
            interface AsObject {
                playerId: string;
            }
        }

        class CreateGameRequest {
            getLobbyId(): string;
            setLobbyId(value: string): void;
            getPlayer1Id(): string;
            setPlayer1Id(value: string): void;
            getPlayer2Id(): string;
            setPlayer2Id(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): CreateGameRequest.AsObject;
            static toObject(includeInstance?: boolean, msg?: CreateGameRequest): CreateGameRequest.AsObject;
            static deserializeBinary(bytes: Uint8Array): CreateGameRequest;
            static deserializeBinaryFromReader(message: CreateGameRequest, reader: jspb.BinaryReader): CreateGameRequest;
            static fromObject(obj: CreateGameRequest.AsObject): CreateGameRequest;
        }
        namespace CreateGameRequest {
            interface AsObject {
                lobbyId: string;
                player1Id: string;
                player2Id: string;
            }
        }

        class MoveRequest {
            getGameId(): string;
            setGameId(value: string): void;
            getPlayerId(): string;
            setPlayerId(value: string): void;
            getPosition(): number;
            setPosition(value: number): void;
            serializeBinary(): Uint8Array;
            toObject(): MoveRequest.AsObject;
            static toObject(includeInstance?: boolean, msg?: MoveRequest): MoveRequest.AsObject;
            static deserializeBinary(bytes: Uint8Array): MoveRequest;
            static deserializeBinaryFromReader(message: MoveRequest, reader: jspb.BinaryReader): MoveRequest;
            static fromObject(obj: MoveRequest.AsObject): MoveRequest.AsObject;
        }
        namespace MoveRequest {
            interface AsObject {
                gameId: string;
                playerId: string;
                position: number;
            }
        }

        class GameUpdateSubscription {
            getGameId(): string;
            setGameId(value: string): void;
            getPlayerId(): string;
            setPlayerId(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): GameUpdateSubscription.AsObject;
            static toObject(includeInstance?: boolean, msg?: GameUpdateSubscription): GameUpdateSubscription.AsObject;
            static deserializeBinary(bytes: Uint8Array): GameUpdateSubscription;
            static deserializeBinaryFromReader(message: GameUpdateSubscription, reader: jspb.BinaryReader): GameUpdateSubscription;
            static fromObject(obj: GameUpdateSubscription.AsObject): GameUpdateSubscription.AsObject;
        }
        namespace GameUpdateSubscription {
            interface AsObject{
                gameId: string;
                playerId: string;
            }
        }

        class GameUpdate {
            getGameId(): string;
            setGameId(value: string): void;
            getBoardList(): string[];
            setBoardList(value: string[]): void;
            getMover(): string;
            setMover(value: string): void;
            getWinner(): string;
            setWinner(value: string): void;
            getResult(): number;
            setResult(value: number): void;
            serializeBinary(): Uint8Array;
            toObject(): GameUpdate.AsObject;
            static toObject(includeInstance?: boolean, msg?: GameUpdate): GameUpdate.AsObject;
            static deserializeBinary(bytes: Uint8Array): GameUpdate;
            static deserializeBinaryFromReader(message: GameUpdate, reader: jspb.BinaryReader): GameUpdate;
            static fromObject(obj: GameUpdate.AsObject): GameUpdate;
        }
        namespace GameUpdate {
            interface AsObject {
                gameId: string;
                boardList: string[];
                mover: string;
                winner: string;
                result: number;
            }
        }

        class LobbySubscription {
            getLobbyId(): string;
            setLobbyId(value: string): void;
            getPlayerId(): string;
            setPlayerId(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): LobbySubscription.AsObject;
            static toObject(includeInstance?: boolean, msg?: LobbySubscription): LobbySubscription.AsObject;
            static deserializeBinary(bytes: Uint8Array): LobbySubscription;
            static deserializeBinaryFromReader(message: LobbySubscription, reader: jspb.BinaryReader): GameUpdateSubscription;
            static fromObject(obj: LobbySubscription.AsObject): LobbySubscription.AsObject;
        }
        namespace LobbySubscription {
            interface AsObject{
                lobbyId: string;
                playerId: string;
            }
        }

        class GameCreatedUpdate {
            getLobbydId(): string;
            setLobbydId(value: string): void;
            getGameId(): string;
            setGameId(value: string): void;
            getPlayer1Id(): string;
            setPlayer1Id(value: string): void;
            getPlayer2Id(): string;
            setPlayer2Id(value: string): void;
            serializeBinary(): Uint8Array;
            toObject(): GameCreatedUpdate.AsObject;
            static toObject(includeInstance?: boolean, msg?: GameCreatedUpdate): GameCreatedUpdate.AsObject;
            static deserializeBinary(bytes: Uint8Array): GameCreatedUpdate;
            static deserializeBinaryFromReader(message: GameCreatedUpdate, reader: jspb.BinaryReader): GameCreatedUpdate;
            static fromObject(obj: GameCreatedUpdate.AsObject): GameCreatedUpdate;
        }
        namespace GameCreatedUpdate{
            interface AsObject{
                lobbydId: string;
                gameId: string;
                player1Id: string;
                player2Id: string;
            }
        }
    }
}

declare const jspb: any;
export = tctxto_pb;
