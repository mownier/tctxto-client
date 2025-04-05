import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class CreateLobbyRequest extends jspb.Message {
  getPlayername(): string;
  setPlayername(value: string): CreateLobbyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLobbyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLobbyRequest): CreateLobbyRequest.AsObject;
  static serializeBinaryToWriter(message: CreateLobbyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLobbyRequest;
  static deserializeBinaryFromReader(message: CreateLobbyRequest, reader: jspb.BinaryReader): CreateLobbyRequest;
}

export namespace CreateLobbyRequest {
  export type AsObject = {
    playername: string,
  }
}

export class CreateLobbyReply extends jspb.Message {
  getLobbyid(): string;
  setLobbyid(value: string): CreateLobbyReply;

  getPlayerid(): string;
  setPlayerid(value: string): CreateLobbyReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLobbyReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLobbyReply): CreateLobbyReply.AsObject;
  static serializeBinaryToWriter(message: CreateLobbyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLobbyReply;
  static deserializeBinaryFromReader(message: CreateLobbyReply, reader: jspb.BinaryReader): CreateLobbyReply;
}

export namespace CreateLobbyReply {
  export type AsObject = {
    lobbyid: string,
    playerid: string,
  }
}

export class JoinLobbyRequest extends jspb.Message {
  getLobbyid(): string;
  setLobbyid(value: string): JoinLobbyRequest;

  getPlayername(): string;
  setPlayername(value: string): JoinLobbyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinLobbyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JoinLobbyRequest): JoinLobbyRequest.AsObject;
  static serializeBinaryToWriter(message: JoinLobbyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinLobbyRequest;
  static deserializeBinaryFromReader(message: JoinLobbyRequest, reader: jspb.BinaryReader): JoinLobbyRequest;
}

export namespace JoinLobbyRequest {
  export type AsObject = {
    lobbyid: string,
    playername: string,
  }
}

export class JoinLobbyReply extends jspb.Message {
  getPlayerid(): string;
  setPlayerid(value: string): JoinLobbyReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinLobbyReply.AsObject;
  static toObject(includeInstance: boolean, msg: JoinLobbyReply): JoinLobbyReply.AsObject;
  static serializeBinaryToWriter(message: JoinLobbyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinLobbyReply;
  static deserializeBinaryFromReader(message: JoinLobbyReply, reader: jspb.BinaryReader): JoinLobbyReply;
}

export namespace JoinLobbyReply {
  export type AsObject = {
    playerid: string,
  }
}

export class CreateGameRequest extends jspb.Message {
  getLobbyid(): string;
  setLobbyid(value: string): CreateGameRequest;

  getPlayer1id(): string;
  setPlayer1id(value: string): CreateGameRequest;

  getPlayer2id(): string;
  setPlayer2id(value: string): CreateGameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateGameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateGameRequest): CreateGameRequest.AsObject;
  static serializeBinaryToWriter(message: CreateGameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateGameRequest;
  static deserializeBinaryFromReader(message: CreateGameRequest, reader: jspb.BinaryReader): CreateGameRequest;
}

export namespace CreateGameRequest {
  export type AsObject = {
    lobbyid: string,
    player1id: string,
    player2id: string,
  }
}

export class MoveRequest extends jspb.Message {
  getGameid(): string;
  setGameid(value: string): MoveRequest;

  getPlayerid(): string;
  setPlayerid(value: string): MoveRequest;

  getPosition(): number;
  setPosition(value: number): MoveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MoveRequest): MoveRequest.AsObject;
  static serializeBinaryToWriter(message: MoveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveRequest;
  static deserializeBinaryFromReader(message: MoveRequest, reader: jspb.BinaryReader): MoveRequest;
}

export namespace MoveRequest {
  export type AsObject = {
    gameid: string,
    playerid: string,
    position: number,
  }
}

export class GameUpdateSubscription extends jspb.Message {
  getGameid(): string;
  setGameid(value: string): GameUpdateSubscription;

  getPlayerid(): string;
  setPlayerid(value: string): GameUpdateSubscription;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameUpdateSubscription.AsObject;
  static toObject(includeInstance: boolean, msg: GameUpdateSubscription): GameUpdateSubscription.AsObject;
  static serializeBinaryToWriter(message: GameUpdateSubscription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameUpdateSubscription;
  static deserializeBinaryFromReader(message: GameUpdateSubscription, reader: jspb.BinaryReader): GameUpdateSubscription;
}

export namespace GameUpdateSubscription {
  export type AsObject = {
    gameid: string,
    playerid: string,
  }
}

export class GameUpdate extends jspb.Message {
  getGameid(): string;
  setGameid(value: string): GameUpdate;

  getBoardList(): Array<string>;
  setBoardList(value: Array<string>): GameUpdate;
  clearBoardList(): GameUpdate;
  addBoard(value: string, index?: number): GameUpdate;

  getMover(): string;
  setMover(value: string): GameUpdate;

  getWinner(): string;
  setWinner(value: string): GameUpdate;

  getResult(): number;
  setResult(value: number): GameUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: GameUpdate): GameUpdate.AsObject;
  static serializeBinaryToWriter(message: GameUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameUpdate;
  static deserializeBinaryFromReader(message: GameUpdate, reader: jspb.BinaryReader): GameUpdate;
}

export namespace GameUpdate {
  export type AsObject = {
    gameid: string,
    boardList: Array<string>,
    mover: string,
    winner: string,
    result: number,
  }
}

export class LobbySubscription extends jspb.Message {
  getLobbyid(): string;
  setLobbyid(value: string): LobbySubscription;

  getPlayerid(): string;
  setPlayerid(value: string): LobbySubscription;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LobbySubscription.AsObject;
  static toObject(includeInstance: boolean, msg: LobbySubscription): LobbySubscription.AsObject;
  static serializeBinaryToWriter(message: LobbySubscription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LobbySubscription;
  static deserializeBinaryFromReader(message: LobbySubscription, reader: jspb.BinaryReader): LobbySubscription;
}

export namespace LobbySubscription {
  export type AsObject = {
    lobbyid: string,
    playerid: string,
  }
}

export class GameCreatedUpdate extends jspb.Message {
  getLobbydid(): string;
  setLobbydid(value: string): GameCreatedUpdate;

  getGameid(): string;
  setGameid(value: string): GameCreatedUpdate;

  getPlayer1id(): string;
  setPlayer1id(value: string): GameCreatedUpdate;

  getPlayer2id(): string;
  setPlayer2id(value: string): GameCreatedUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameCreatedUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: GameCreatedUpdate): GameCreatedUpdate.AsObject;
  static serializeBinaryToWriter(message: GameCreatedUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameCreatedUpdate;
  static deserializeBinaryFromReader(message: GameCreatedUpdate, reader: jspb.BinaryReader): GameCreatedUpdate;
}

export namespace GameCreatedUpdate {
  export type AsObject = {
    lobbydid: string,
    gameid: string,
    player1id: string,
    player2id: string,
  }
}

