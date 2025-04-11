import * as jspb from 'google-protobuf'



export class SubscriptionUpdateData extends jspb.Message {
  getNavigationUpdate(): NavigationUpdate | undefined;
  setNavigationUpdate(value?: NavigationUpdate): SubscriptionUpdateData;
  hasNavigationUpdate(): boolean;
  clearNavigationUpdate(): SubscriptionUpdateData;

  getHandshakeReply(): HandshakeReply | undefined;
  setHandshakeReply(value?: HandshakeReply): SubscriptionUpdateData;
  hasHandshakeReply(): boolean;
  clearHandshakeReply(): SubscriptionUpdateData;

  getInvalidateReply(): InvalidateReply | undefined;
  setInvalidateReply(value?: InvalidateReply): SubscriptionUpdateData;
  hasInvalidateReply(): boolean;
  clearInvalidateReply(): SubscriptionUpdateData;

  getCreateLobbyReply(): CreateLobbyReply | undefined;
  setCreateLobbyReply(value?: CreateLobbyReply): SubscriptionUpdateData;
  hasCreateLobbyReply(): boolean;
  clearCreateLobbyReply(): SubscriptionUpdateData;

  getJoinLobbyReply(): JoinLobbyReply | undefined;
  setJoinLobbyReply(value?: JoinLobbyReply): SubscriptionUpdateData;
  hasJoinLobbyReply(): boolean;
  clearJoinLobbyReply(): SubscriptionUpdateData;

  getLeaveMyLobbyReply(): LeaveMyLobbyReply | undefined;
  setLeaveMyLobbyReply(value?: LeaveMyLobbyReply): SubscriptionUpdateData;
  hasLeaveMyLobbyReply(): boolean;
  clearLeaveMyLobbyReply(): SubscriptionUpdateData;

  getMyLobbyDetails(): MyLobbyDetails | undefined;
  setMyLobbyDetails(value?: MyLobbyDetails): SubscriptionUpdateData;
  hasMyLobbyDetails(): boolean;
  clearMyLobbyDetails(): SubscriptionUpdateData;

  getMyLobbyJoinerUpdate(): MyLobbyJoinerUpdate | undefined;
  setMyLobbyJoinerUpdate(value?: MyLobbyJoinerUpdate): SubscriptionUpdateData;
  hasMyLobbyJoinerUpdate(): boolean;
  clearMyLobbyJoinerUpdate(): SubscriptionUpdateData;

  getMyLobbyLeaverUpdate(): MyLobbyLeaverUpdate | undefined;
  setMyLobbyLeaverUpdate(value?: MyLobbyLeaverUpdate): SubscriptionUpdateData;
  hasMyLobbyLeaverUpdate(): boolean;
  clearMyLobbyLeaverUpdate(): SubscriptionUpdateData;

  getCreateGameReply(): CreateGameReply | undefined;
  setCreateGameReply(value?: CreateGameReply): SubscriptionUpdateData;
  hasCreateGameReply(): boolean;
  clearCreateGameReply(): SubscriptionUpdateData;

  getMakeMoveReply(): MakeMoveReply | undefined;
  setMakeMoveReply(value?: MakeMoveReply): SubscriptionUpdateData;
  hasMakeMoveReply(): boolean;
  clearMakeMoveReply(): SubscriptionUpdateData;

  getMoveUpdate(): MoveUpdate | undefined;
  setMoveUpdate(value?: MoveUpdate): SubscriptionUpdateData;
  hasMoveUpdate(): boolean;
  clearMoveUpdate(): SubscriptionUpdateData;

  getWinnerUpdate(): WinnerUpdate | undefined;
  setWinnerUpdate(value?: WinnerUpdate): SubscriptionUpdateData;
  hasWinnerUpdate(): boolean;
  clearWinnerUpdate(): SubscriptionUpdateData;

  getDrawUpdate(): DrawUpdate | undefined;
  setDrawUpdate(value?: DrawUpdate): SubscriptionUpdateData;
  hasDrawUpdate(): boolean;
  clearDrawUpdate(): SubscriptionUpdateData;

  getGameStartUpdate(): GameStartUpdate | undefined;
  setGameStartUpdate(value?: GameStartUpdate): SubscriptionUpdateData;
  hasGameStartUpdate(): boolean;
  clearGameStartUpdate(): SubscriptionUpdateData;

  getNextMoverUpdate(): NextMoverUpdate | undefined;
  setNextMoverUpdate(value?: NextMoverUpdate): SubscriptionUpdateData;
  hasNextMoverUpdate(): boolean;
  clearNextMoverUpdate(): SubscriptionUpdateData;

  getPlayerClientUpdate(): PlayerClientUpdate | undefined;
  setPlayerClientUpdate(value?: PlayerClientUpdate): SubscriptionUpdateData;
  hasPlayerClientUpdate(): boolean;
  clearPlayerClientUpdate(): SubscriptionUpdateData;

  getSubscriptionUpdateDataTypeCase(): SubscriptionUpdateData.SubscriptionUpdateDataTypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscriptionUpdateData.AsObject;
  static toObject(includeInstance: boolean, msg: SubscriptionUpdateData): SubscriptionUpdateData.AsObject;
  static serializeBinaryToWriter(message: SubscriptionUpdateData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscriptionUpdateData;
  static deserializeBinaryFromReader(message: SubscriptionUpdateData, reader: jspb.BinaryReader): SubscriptionUpdateData;
}

export namespace SubscriptionUpdateData {
  export type AsObject = {
    navigationUpdate?: NavigationUpdate.AsObject,
    handshakeReply?: HandshakeReply.AsObject,
    invalidateReply?: InvalidateReply.AsObject,
    createLobbyReply?: CreateLobbyReply.AsObject,
    joinLobbyReply?: JoinLobbyReply.AsObject,
    leaveMyLobbyReply?: LeaveMyLobbyReply.AsObject,
    myLobbyDetails?: MyLobbyDetails.AsObject,
    myLobbyJoinerUpdate?: MyLobbyJoinerUpdate.AsObject,
    myLobbyLeaverUpdate?: MyLobbyLeaverUpdate.AsObject,
    createGameReply?: CreateGameReply.AsObject,
    makeMoveReply?: MakeMoveReply.AsObject,
    moveUpdate?: MoveUpdate.AsObject,
    winnerUpdate?: WinnerUpdate.AsObject,
    drawUpdate?: DrawUpdate.AsObject,
    gameStartUpdate?: GameStartUpdate.AsObject,
    nextMoverUpdate?: NextMoverUpdate.AsObject,
    playerClientUpdate?: PlayerClientUpdate.AsObject,
  }

  export enum SubscriptionUpdateDataTypeCase { 
    SUBSCRIPTION_UPDATE_DATA_TYPE_NOT_SET = 0,
    NAVIGATION_UPDATE = 1,
    HANDSHAKE_REPLY = 2,
    INVALIDATE_REPLY = 3,
    CREATE_LOBBY_REPLY = 4,
    JOIN_LOBBY_REPLY = 5,
    LEAVE_MY_LOBBY_REPLY = 6,
    MY_LOBBY_DETAILS = 7,
    MY_LOBBY_JOINER_UPDATE = 8,
    MY_LOBBY_LEAVER_UPDATE = 9,
    CREATE_GAME_REPLY = 10,
    MAKE_MOVE_REPLY = 11,
    MOVE_UPDATE = 12,
    WINNER_UPDATE = 13,
    DRAW_UPDATE = 14,
    GAME_START_UPDATE = 15,
    NEXT_MOVER_UPDATE = 16,
    PLAYER_CLIENT_UPDATE = 17,
  }
}

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

export class Outcome extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): Outcome;

  getErrorCode(): number;
  setErrorCode(value: number): Outcome;

  getErrorMessage(): string;
  setErrorMessage(value: string): Outcome;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Outcome.AsObject;
  static toObject(includeInstance: boolean, msg: Outcome): Outcome.AsObject;
  static serializeBinaryToWriter(message: Outcome, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Outcome;
  static deserializeBinaryFromReader(message: Outcome, reader: jspb.BinaryReader): Outcome;
}

export namespace Outcome {
  export type AsObject = {
    ok: boolean,
    errorCode: number,
    errorMessage: string,
  }
}

export class Lobby extends jspb.Message {
  getName(): string;
  setName(value: string): Lobby;

  getPlayersList(): Array<Player>;
  setPlayersList(value: Array<Player>): Lobby;
  clearPlayersList(): Lobby;
  addPlayers(value?: Player, index?: number): Player;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Lobby.AsObject;
  static toObject(includeInstance: boolean, msg: Lobby): Lobby.AsObject;
  static serializeBinaryToWriter(message: Lobby, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Lobby;
  static deserializeBinaryFromReader(message: Lobby, reader: jspb.BinaryReader): Lobby;
}

export namespace Lobby {
  export type AsObject = {
    name: string,
    playersList: Array<Player.AsObject>,
  }
}

export class Player extends jspb.Message {
  getId(): string;
  setId(value: string): Player;

  getName(): string;
  setName(value: string): Player;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Player.AsObject;
  static toObject(includeInstance: boolean, msg: Player): Player.AsObject;
  static serializeBinaryToWriter(message: Player, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Player;
  static deserializeBinaryFromReader(message: Player, reader: jspb.BinaryReader): Player;
}

export namespace Player {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class ExchangeRequest extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): ExchangeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRequest): ExchangeRequest.AsObject;
  static serializeBinaryToWriter(message: ExchangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRequest;
  static deserializeBinaryFromReader(message: ExchangeRequest, reader: jspb.BinaryReader): ExchangeRequest;
}

export namespace ExchangeRequest {
  export type AsObject = {
    publicKey: string,
  }
}

export class ExchangeReply extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): ExchangeReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeReply.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeReply): ExchangeReply.AsObject;
  static serializeBinaryToWriter(message: ExchangeReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeReply;
  static deserializeBinaryFromReader(message: ExchangeReply, reader: jspb.BinaryReader): ExchangeReply;
}

export namespace ExchangeReply {
  export type AsObject = {
    clientId: string,
  }
}

export class MyLobbyDetails extends jspb.Message {
  getLobby(): Lobby | undefined;
  setLobby(value?: Lobby): MyLobbyDetails;
  hasLobby(): boolean;
  clearLobby(): MyLobbyDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MyLobbyDetails.AsObject;
  static toObject(includeInstance: boolean, msg: MyLobbyDetails): MyLobbyDetails.AsObject;
  static serializeBinaryToWriter(message: MyLobbyDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MyLobbyDetails;
  static deserializeBinaryFromReader(message: MyLobbyDetails, reader: jspb.BinaryReader): MyLobbyDetails;
}

export namespace MyLobbyDetails {
  export type AsObject = {
    lobby?: Lobby.AsObject,
  }
}

export class MyLobbyJoinerUpdate extends jspb.Message {
  getPlayer(): Player | undefined;
  setPlayer(value?: Player): MyLobbyJoinerUpdate;
  hasPlayer(): boolean;
  clearPlayer(): MyLobbyJoinerUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MyLobbyJoinerUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: MyLobbyJoinerUpdate): MyLobbyJoinerUpdate.AsObject;
  static serializeBinaryToWriter(message: MyLobbyJoinerUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MyLobbyJoinerUpdate;
  static deserializeBinaryFromReader(message: MyLobbyJoinerUpdate, reader: jspb.BinaryReader): MyLobbyJoinerUpdate;
}

export namespace MyLobbyJoinerUpdate {
  export type AsObject = {
    player?: Player.AsObject,
  }
}

export class MyLobbyLeaverUpdate extends jspb.Message {
  getPlayer(): Player | undefined;
  setPlayer(value?: Player): MyLobbyLeaverUpdate;
  hasPlayer(): boolean;
  clearPlayer(): MyLobbyLeaverUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MyLobbyLeaverUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: MyLobbyLeaverUpdate): MyLobbyLeaverUpdate.AsObject;
  static serializeBinaryToWriter(message: MyLobbyLeaverUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MyLobbyLeaverUpdate;
  static deserializeBinaryFromReader(message: MyLobbyLeaverUpdate, reader: jspb.BinaryReader): MyLobbyLeaverUpdate;
}

export namespace MyLobbyLeaverUpdate {
  export type AsObject = {
    player?: Player.AsObject,
  }
}

export class LeaveMyLobbyReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): LeaveMyLobbyReply;
  hasOutcome(): boolean;
  clearOutcome(): LeaveMyLobbyReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaveMyLobbyReply.AsObject;
  static toObject(includeInstance: boolean, msg: LeaveMyLobbyReply): LeaveMyLobbyReply.AsObject;
  static serializeBinaryToWriter(message: LeaveMyLobbyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaveMyLobbyReply;
  static deserializeBinaryFromReader(message: LeaveMyLobbyReply, reader: jspb.BinaryReader): LeaveMyLobbyReply;
}

export namespace LeaveMyLobbyReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class JoinLobbyRequest extends jspb.Message {
  getLobbyId(): string;
  setLobbyId(value: string): JoinLobbyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinLobbyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JoinLobbyRequest): JoinLobbyRequest.AsObject;
  static serializeBinaryToWriter(message: JoinLobbyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinLobbyRequest;
  static deserializeBinaryFromReader(message: JoinLobbyRequest, reader: jspb.BinaryReader): JoinLobbyRequest;
}

export namespace JoinLobbyRequest {
  export type AsObject = {
    lobbyId: string,
  }
}

export class JoinLobbyReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): JoinLobbyReply;
  hasOutcome(): boolean;
  clearOutcome(): JoinLobbyReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinLobbyReply.AsObject;
  static toObject(includeInstance: boolean, msg: JoinLobbyReply): JoinLobbyReply.AsObject;
  static serializeBinaryToWriter(message: JoinLobbyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinLobbyReply;
  static deserializeBinaryFromReader(message: JoinLobbyReply, reader: jspb.BinaryReader): JoinLobbyReply;
}

export namespace JoinLobbyReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class InvalidateReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): InvalidateReply;
  hasOutcome(): boolean;
  clearOutcome(): InvalidateReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InvalidateReply.AsObject;
  static toObject(includeInstance: boolean, msg: InvalidateReply): InvalidateReply.AsObject;
  static serializeBinaryToWriter(message: InvalidateReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InvalidateReply;
  static deserializeBinaryFromReader(message: InvalidateReply, reader: jspb.BinaryReader): InvalidateReply;
}

export namespace InvalidateReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class SubscriptionUpdate extends jspb.Message {
  getData(): SubscriptionUpdateData | undefined;
  setData(value?: SubscriptionUpdateData): SubscriptionUpdate;
  hasData(): boolean;
  clearData(): SubscriptionUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscriptionUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: SubscriptionUpdate): SubscriptionUpdate.AsObject;
  static serializeBinaryToWriter(message: SubscriptionUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscriptionUpdate;
  static deserializeBinaryFromReader(message: SubscriptionUpdate, reader: jspb.BinaryReader): SubscriptionUpdate;
}

export namespace SubscriptionUpdate {
  export type AsObject = {
    data?: SubscriptionUpdateData.AsObject,
  }
}

export class HandshakeRequest extends jspb.Message {
  getPlayerName(): string;
  setPlayerName(value: string): HandshakeRequest;

  getPlayerPass(): string;
  setPlayerPass(value: string): HandshakeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HandshakeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HandshakeRequest): HandshakeRequest.AsObject;
  static serializeBinaryToWriter(message: HandshakeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HandshakeRequest;
  static deserializeBinaryFromReader(message: HandshakeRequest, reader: jspb.BinaryReader): HandshakeRequest;
}

export namespace HandshakeRequest {
  export type AsObject = {
    playerName: string,
    playerPass: string,
  }
}

export class HandshakeReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): HandshakeReply;
  hasOutcome(): boolean;
  clearOutcome(): HandshakeReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HandshakeReply.AsObject;
  static toObject(includeInstance: boolean, msg: HandshakeReply): HandshakeReply.AsObject;
  static serializeBinaryToWriter(message: HandshakeReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HandshakeReply;
  static deserializeBinaryFromReader(message: HandshakeReply, reader: jspb.BinaryReader): HandshakeReply;
}

export namespace HandshakeReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class NavigationUpdate extends jspb.Message {
  getPath(): NavigationPath;
  setPath(value: NavigationPath): NavigationUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NavigationUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: NavigationUpdate): NavigationUpdate.AsObject;
  static serializeBinaryToWriter(message: NavigationUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NavigationUpdate;
  static deserializeBinaryFromReader(message: NavigationUpdate, reader: jspb.BinaryReader): NavigationUpdate;
}

export namespace NavigationUpdate {
  export type AsObject = {
    path: NavigationPath,
  }
}

export class Move extends jspb.Message {
  getMover(): Mover;
  setMover(value: Mover): Move;

  getPosition(): number;
  setPosition(value: number): Move;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Move.AsObject;
  static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
  static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Move;
  static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
  export type AsObject = {
    mover: Mover,
    position: number,
  }
}

export class MoveUpdate extends jspb.Message {
  getMove(): Move | undefined;
  setMove(value?: Move): MoveUpdate;
  hasMove(): boolean;
  clearMove(): MoveUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: MoveUpdate): MoveUpdate.AsObject;
  static serializeBinaryToWriter(message: MoveUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveUpdate;
  static deserializeBinaryFromReader(message: MoveUpdate, reader: jspb.BinaryReader): MoveUpdate;
}

export namespace MoveUpdate {
  export type AsObject = {
    move?: Move.AsObject,
  }
}

export class NextMoverUpdate extends jspb.Message {
  getMover(): Mover;
  setMover(value: Mover): NextMoverUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextMoverUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: NextMoverUpdate): NextMoverUpdate.AsObject;
  static serializeBinaryToWriter(message: NextMoverUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextMoverUpdate;
  static deserializeBinaryFromReader(message: NextMoverUpdate, reader: jspb.BinaryReader): NextMoverUpdate;
}

export namespace NextMoverUpdate {
  export type AsObject = {
    mover: Mover,
  }
}

export class MakeMoveRequest extends jspb.Message {
  getPosition(): number;
  setPosition(value: number): MakeMoveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MakeMoveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MakeMoveRequest): MakeMoveRequest.AsObject;
  static serializeBinaryToWriter(message: MakeMoveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MakeMoveRequest;
  static deserializeBinaryFromReader(message: MakeMoveRequest, reader: jspb.BinaryReader): MakeMoveRequest;
}

export namespace MakeMoveRequest {
  export type AsObject = {
    position: number,
  }
}

export class MakeMoveReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): MakeMoveReply;
  hasOutcome(): boolean;
  clearOutcome(): MakeMoveReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MakeMoveReply.AsObject;
  static toObject(includeInstance: boolean, msg: MakeMoveReply): MakeMoveReply.AsObject;
  static serializeBinaryToWriter(message: MakeMoveReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MakeMoveReply;
  static deserializeBinaryFromReader(message: MakeMoveReply, reader: jspb.BinaryReader): MakeMoveReply;
}

export namespace MakeMoveReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class CreateLobbyRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateLobbyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLobbyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLobbyRequest): CreateLobbyRequest.AsObject;
  static serializeBinaryToWriter(message: CreateLobbyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLobbyRequest;
  static deserializeBinaryFromReader(message: CreateLobbyRequest, reader: jspb.BinaryReader): CreateLobbyRequest;
}

export namespace CreateLobbyRequest {
  export type AsObject = {
    name: string,
  }
}

export class CreateLobbyReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): CreateLobbyReply;
  hasOutcome(): boolean;
  clearOutcome(): CreateLobbyReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLobbyReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLobbyReply): CreateLobbyReply.AsObject;
  static serializeBinaryToWriter(message: CreateLobbyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLobbyReply;
  static deserializeBinaryFromReader(message: CreateLobbyReply, reader: jspb.BinaryReader): CreateLobbyReply;
}

export namespace CreateLobbyReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class CreateGameRequest extends jspb.Message {
  getPlayer1Id(): string;
  setPlayer1Id(value: string): CreateGameRequest;

  getPlayer2Id(): string;
  setPlayer2Id(value: string): CreateGameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateGameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateGameRequest): CreateGameRequest.AsObject;
  static serializeBinaryToWriter(message: CreateGameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateGameRequest;
  static deserializeBinaryFromReader(message: CreateGameRequest, reader: jspb.BinaryReader): CreateGameRequest;
}

export namespace CreateGameRequest {
  export type AsObject = {
    player1Id: string,
    player2Id: string,
  }
}

export class CreateGameReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): CreateGameReply;
  hasOutcome(): boolean;
  clearOutcome(): CreateGameReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateGameReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateGameReply): CreateGameReply.AsObject;
  static serializeBinaryToWriter(message: CreateGameReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateGameReply;
  static deserializeBinaryFromReader(message: CreateGameReply, reader: jspb.BinaryReader): CreateGameReply;
}

export namespace CreateGameReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class WinnerUpdate extends jspb.Message {
  getWinner(): Winner;
  setWinner(value: Winner): WinnerUpdate;

  getMover(): Mover;
  setMover(value: Mover): WinnerUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WinnerUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: WinnerUpdate): WinnerUpdate.AsObject;
  static serializeBinaryToWriter(message: WinnerUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WinnerUpdate;
  static deserializeBinaryFromReader(message: WinnerUpdate, reader: jspb.BinaryReader): WinnerUpdate;
}

export namespace WinnerUpdate {
  export type AsObject = {
    winner: Winner,
    mover: Mover,
  }
}

export class DrawUpdate extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DrawUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: DrawUpdate): DrawUpdate.AsObject;
  static serializeBinaryToWriter(message: DrawUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DrawUpdate;
  static deserializeBinaryFromReader(message: DrawUpdate, reader: jspb.BinaryReader): DrawUpdate;
}

export namespace DrawUpdate {
  export type AsObject = {
  }
}

export class GameStartUpdate extends jspb.Message {
  getYou(): Mover;
  setYou(value: Mover): GameStartUpdate;

  getOther(): Mover;
  setOther(value: Mover): GameStartUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameStartUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: GameStartUpdate): GameStartUpdate.AsObject;
  static serializeBinaryToWriter(message: GameStartUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameStartUpdate;
  static deserializeBinaryFromReader(message: GameStartUpdate, reader: jspb.BinaryReader): GameStartUpdate;
}

export namespace GameStartUpdate {
  export type AsObject = {
    you: Mover,
    other: Mover,
  }
}

export class PlayerClientUpdate extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): PlayerClientUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerClientUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerClientUpdate): PlayerClientUpdate.AsObject;
  static serializeBinaryToWriter(message: PlayerClientUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerClientUpdate;
  static deserializeBinaryFromReader(message: PlayerClientUpdate, reader: jspb.BinaryReader): PlayerClientUpdate;
}

export namespace PlayerClientUpdate {
  export type AsObject = {
    message: string,
  }
}

export enum NavigationPath { 
  LOGIN = 0,
  HOME = 1,
  MY_LOBBY = 2,
  GAME = 3,
}
export enum Mover { 
  UNSPECIFIED = 0,
  X = 1,
  O = 2,
}
export enum Winner { 
  YOU = 0,
  OTHER = 1,
}
