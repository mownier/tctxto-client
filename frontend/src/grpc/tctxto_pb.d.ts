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

export class ClientUpdate extends jspb.Message {
  getSignUpRequest(): SignUpRequest | undefined;
  setSignUpRequest(value?: SignUpRequest): ClientUpdate;
  hasSignUpRequest(): boolean;
  clearSignUpRequest(): ClientUpdate;

  getSignInRequest(): SignInRequest | undefined;
  setSignInRequest(value?: SignInRequest): ClientUpdate;
  hasSignInRequest(): boolean;
  clearSignInRequest(): ClientUpdate;

  getSignOutRequest(): SignOutRequest | undefined;
  setSignOutRequest(value?: SignOutRequest): ClientUpdate;
  hasSignOutRequest(): boolean;
  clearSignOutRequest(): ClientUpdate;

  getCreateLobbyRequest(): CreateLobbyRequest | undefined;
  setCreateLobbyRequest(value?: CreateLobbyRequest): ClientUpdate;
  hasCreateLobbyRequest(): boolean;
  clearCreateLobbyRequest(): ClientUpdate;

  getJoinLobbyRequest(): JoinLobbyRequest | undefined;
  setJoinLobbyRequest(value?: JoinLobbyRequest): ClientUpdate;
  hasJoinLobbyRequest(): boolean;
  clearJoinLobbyRequest(): ClientUpdate;

  getCreateGameRequest(): CreateGameRequest | undefined;
  setCreateGameRequest(value?: CreateGameRequest): ClientUpdate;
  hasCreateGameRequest(): boolean;
  clearCreateGameRequest(): ClientUpdate;

  getMakeMoveRequest(): MakeMoveRequest | undefined;
  setMakeMoveRequest(value?: MakeMoveRequest): ClientUpdate;
  hasMakeMoveRequest(): boolean;
  clearMakeMoveRequest(): ClientUpdate;

  getTypeCase(): ClientUpdate.TypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: ClientUpdate): ClientUpdate.AsObject;
  static serializeBinaryToWriter(message: ClientUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientUpdate;
  static deserializeBinaryFromReader(message: ClientUpdate, reader: jspb.BinaryReader): ClientUpdate;
}

export namespace ClientUpdate {
  export type AsObject = {
    signUpRequest?: SignUpRequest.AsObject,
    signInRequest?: SignInRequest.AsObject,
    signOutRequest?: SignOutRequest.AsObject,
    createLobbyRequest?: CreateLobbyRequest.AsObject,
    joinLobbyRequest?: JoinLobbyRequest.AsObject,
    createGameRequest?: CreateGameRequest.AsObject,
    makeMoveRequest?: MakeMoveRequest.AsObject,
  }

  export enum TypeCase { 
    TYPE_NOT_SET = 0,
    SIGN_UP_REQUEST = 1,
    SIGN_IN_REQUEST = 2,
    SIGN_OUT_REQUEST = 3,
    CREATE_LOBBY_REQUEST = 4,
    JOIN_LOBBY_REQUEST = 5,
    CREATE_GAME_REQUEST = 6,
    MAKE_MOVE_REQUEST = 7,
  }
}

export class ServerUpdate extends jspb.Message {
  getPing(): Ping | undefined;
  setPing(value?: Ping): ServerUpdate;
  hasPing(): boolean;
  clearPing(): ServerUpdate;

  getClientAssignmentUpdate(): ClientAssignmentUpdate | undefined;
  setClientAssignmentUpdate(value?: ClientAssignmentUpdate): ServerUpdate;
  hasClientAssignmentUpdate(): boolean;
  clearClientAssignmentUpdate(): ServerUpdate;

  getNavigationUpdate(): NavigationUpdate | undefined;
  setNavigationUpdate(value?: NavigationUpdate): ServerUpdate;
  hasNavigationUpdate(): boolean;
  clearNavigationUpdate(): ServerUpdate;

  getSignUpReply(): SignUpReply | undefined;
  setSignUpReply(value?: SignUpReply): ServerUpdate;
  hasSignUpReply(): boolean;
  clearSignUpReply(): ServerUpdate;

  getSignInReply(): SignInReply | undefined;
  setSignInReply(value?: SignInReply): ServerUpdate;
  hasSignInReply(): boolean;
  clearSignInReply(): ServerUpdate;

  getSignOutReply(): SignOutReply | undefined;
  setSignOutReply(value?: SignOutReply): ServerUpdate;
  hasSignOutReply(): boolean;
  clearSignOutReply(): ServerUpdate;

  getMyLobbyDetails(): MyLobbyDetails | undefined;
  setMyLobbyDetails(value?: MyLobbyDetails): ServerUpdate;
  hasMyLobbyDetails(): boolean;
  clearMyLobbyDetails(): ServerUpdate;

  getMyLobbyJoinerUpdate(): MyLobbyJoinerUpdate | undefined;
  setMyLobbyJoinerUpdate(value?: MyLobbyJoinerUpdate): ServerUpdate;
  hasMyLobbyJoinerUpdate(): boolean;
  clearMyLobbyJoinerUpdate(): ServerUpdate;

  getMyLobbyLeaverUpdate(): MyLobbyLeaverUpdate | undefined;
  setMyLobbyLeaverUpdate(value?: MyLobbyLeaverUpdate): ServerUpdate;
  hasMyLobbyLeaverUpdate(): boolean;
  clearMyLobbyLeaverUpdate(): ServerUpdate;

  getCreateLobbyReply(): CreateLobbyReply | undefined;
  setCreateLobbyReply(value?: CreateLobbyReply): ServerUpdate;
  hasCreateLobbyReply(): boolean;
  clearCreateLobbyReply(): ServerUpdate;

  getJoinLobbyReply(): JoinLobbyReply | undefined;
  setJoinLobbyReply(value?: JoinLobbyReply): ServerUpdate;
  hasJoinLobbyReply(): boolean;
  clearJoinLobbyReply(): ServerUpdate;

  getLeaveMyLobbyReply(): LeaveMyLobbyReply | undefined;
  setLeaveMyLobbyReply(value?: LeaveMyLobbyReply): ServerUpdate;
  hasLeaveMyLobbyReply(): boolean;
  clearLeaveMyLobbyReply(): ServerUpdate;

  getCreateGameReply(): CreateGameReply | undefined;
  setCreateGameReply(value?: CreateGameReply): ServerUpdate;
  hasCreateGameReply(): boolean;
  clearCreateGameReply(): ServerUpdate;

  getMakeMoveReply(): MakeMoveReply | undefined;
  setMakeMoveReply(value?: MakeMoveReply): ServerUpdate;
  hasMakeMoveReply(): boolean;
  clearMakeMoveReply(): ServerUpdate;

  getMoveUpdate(): MoveUpdate | undefined;
  setMoveUpdate(value?: MoveUpdate): ServerUpdate;
  hasMoveUpdate(): boolean;
  clearMoveUpdate(): ServerUpdate;

  getWinnerUpdate(): WinnerUpdate | undefined;
  setWinnerUpdate(value?: WinnerUpdate): ServerUpdate;
  hasWinnerUpdate(): boolean;
  clearWinnerUpdate(): ServerUpdate;

  getDrawUpdate(): DrawUpdate | undefined;
  setDrawUpdate(value?: DrawUpdate): ServerUpdate;
  hasDrawUpdate(): boolean;
  clearDrawUpdate(): ServerUpdate;

  getGameStartUpdate(): GameStartUpdate | undefined;
  setGameStartUpdate(value?: GameStartUpdate): ServerUpdate;
  hasGameStartUpdate(): boolean;
  clearGameStartUpdate(): ServerUpdate;

  getNextMoverUpdate(): NextMoverUpdate | undefined;
  setNextMoverUpdate(value?: NextMoverUpdate): ServerUpdate;
  hasNextMoverUpdate(): boolean;
  clearNextMoverUpdate(): ServerUpdate;

  getPlayerClientUpdate(): PlayerClientUpdate | undefined;
  setPlayerClientUpdate(value?: PlayerClientUpdate): ServerUpdate;
  hasPlayerClientUpdate(): boolean;
  clearPlayerClientUpdate(): ServerUpdate;

  getPlayerDisplayNameUpdate(): PlayerDisplayNameUpdate | undefined;
  setPlayerDisplayNameUpdate(value?: PlayerDisplayNameUpdate): ServerUpdate;
  hasPlayerDisplayNameUpdate(): boolean;
  clearPlayerDisplayNameUpdate(): ServerUpdate;

  getTypeCase(): ServerUpdate.TypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: ServerUpdate): ServerUpdate.AsObject;
  static serializeBinaryToWriter(message: ServerUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerUpdate;
  static deserializeBinaryFromReader(message: ServerUpdate, reader: jspb.BinaryReader): ServerUpdate;
}

export namespace ServerUpdate {
  export type AsObject = {
    ping?: Ping.AsObject,
    clientAssignmentUpdate?: ClientAssignmentUpdate.AsObject,
    navigationUpdate?: NavigationUpdate.AsObject,
    signUpReply?: SignUpReply.AsObject,
    signInReply?: SignInReply.AsObject,
    signOutReply?: SignOutReply.AsObject,
    myLobbyDetails?: MyLobbyDetails.AsObject,
    myLobbyJoinerUpdate?: MyLobbyJoinerUpdate.AsObject,
    myLobbyLeaverUpdate?: MyLobbyLeaverUpdate.AsObject,
    createLobbyReply?: CreateLobbyReply.AsObject,
    joinLobbyReply?: JoinLobbyReply.AsObject,
    leaveMyLobbyReply?: LeaveMyLobbyReply.AsObject,
    createGameReply?: CreateGameReply.AsObject,
    makeMoveReply?: MakeMoveReply.AsObject,
    moveUpdate?: MoveUpdate.AsObject,
    winnerUpdate?: WinnerUpdate.AsObject,
    drawUpdate?: DrawUpdate.AsObject,
    gameStartUpdate?: GameStartUpdate.AsObject,
    nextMoverUpdate?: NextMoverUpdate.AsObject,
    playerClientUpdate?: PlayerClientUpdate.AsObject,
    playerDisplayNameUpdate?: PlayerDisplayNameUpdate.AsObject,
  }

  export enum TypeCase { 
    TYPE_NOT_SET = 0,
    PING = 1,
    CLIENT_ASSIGNMENT_UPDATE = 2,
    NAVIGATION_UPDATE = 3,
    SIGN_UP_REPLY = 4,
    SIGN_IN_REPLY = 5,
    SIGN_OUT_REPLY = 6,
    MY_LOBBY_DETAILS = 7,
    MY_LOBBY_JOINER_UPDATE = 8,
    MY_LOBBY_LEAVER_UPDATE = 9,
    CREATE_LOBBY_REPLY = 10,
    JOIN_LOBBY_REPLY = 11,
    LEAVE_MY_LOBBY_REPLY = 12,
    CREATE_GAME_REPLY = 13,
    MAKE_MOVE_REPLY = 14,
    MOVE_UPDATE = 15,
    WINNER_UPDATE = 16,
    DRAW_UPDATE = 17,
    GAME_START_UPDATE = 18,
    NEXT_MOVER_UPDATE = 19,
    PLAYER_CLIENT_UPDATE = 20,
    PLAYER_DISPLAY_NAME_UPDATE = 21,
  }
}

export class Ping extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ping.AsObject;
  static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
  static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ping;
  static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
  export type AsObject = {
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

export class ClientAssignmentUpdate extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): ClientAssignmentUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientAssignmentUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: ClientAssignmentUpdate): ClientAssignmentUpdate.AsObject;
  static serializeBinaryToWriter(message: ClientAssignmentUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientAssignmentUpdate;
  static deserializeBinaryFromReader(message: ClientAssignmentUpdate, reader: jspb.BinaryReader): ClientAssignmentUpdate;
}

export namespace ClientAssignmentUpdate {
  export type AsObject = {
    clientId: string,
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

export class SignInRequest extends jspb.Message {
  getName(): string;
  setName(value: string): SignInRequest;

  getPass(): string;
  setPass(value: string): SignInRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignInRequest): SignInRequest.AsObject;
  static serializeBinaryToWriter(message: SignInRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInRequest;
  static deserializeBinaryFromReader(message: SignInRequest, reader: jspb.BinaryReader): SignInRequest;
}

export namespace SignInRequest {
  export type AsObject = {
    name: string,
    pass: string,
  }
}

export class SignInReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): SignInReply;
  hasOutcome(): boolean;
  clearOutcome(): SignInReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInReply.AsObject;
  static toObject(includeInstance: boolean, msg: SignInReply): SignInReply.AsObject;
  static serializeBinaryToWriter(message: SignInReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInReply;
  static deserializeBinaryFromReader(message: SignInReply, reader: jspb.BinaryReader): SignInReply;
}

export namespace SignInReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class SignUpRequest extends jspb.Message {
  getName(): string;
  setName(value: string): SignUpRequest;

  getPass(): string;
  setPass(value: string): SignUpRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpRequest): SignUpRequest.AsObject;
  static serializeBinaryToWriter(message: SignUpRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpRequest;
  static deserializeBinaryFromReader(message: SignUpRequest, reader: jspb.BinaryReader): SignUpRequest;
}

export namespace SignUpRequest {
  export type AsObject = {
    name: string,
    pass: string,
  }
}

export class SignUpReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): SignUpReply;
  hasOutcome(): boolean;
  clearOutcome(): SignUpReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpReply.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpReply): SignUpReply.AsObject;
  static serializeBinaryToWriter(message: SignUpReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpReply;
  static deserializeBinaryFromReader(message: SignUpReply, reader: jspb.BinaryReader): SignUpReply;
}

export namespace SignUpReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
  }
}

export class SignOutRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignOutRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignOutRequest): SignOutRequest.AsObject;
  static serializeBinaryToWriter(message: SignOutRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignOutRequest;
  static deserializeBinaryFromReader(message: SignOutRequest, reader: jspb.BinaryReader): SignOutRequest;
}

export namespace SignOutRequest {
  export type AsObject = {
  }
}

export class SignOutReply extends jspb.Message {
  getOutcome(): Outcome | undefined;
  setOutcome(value?: Outcome): SignOutReply;
  hasOutcome(): boolean;
  clearOutcome(): SignOutReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignOutReply.AsObject;
  static toObject(includeInstance: boolean, msg: SignOutReply): SignOutReply.AsObject;
  static serializeBinaryToWriter(message: SignOutReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignOutReply;
  static deserializeBinaryFromReader(message: SignOutReply, reader: jspb.BinaryReader): SignOutReply;
}

export namespace SignOutReply {
  export type AsObject = {
    outcome?: Outcome.AsObject,
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

export class PlayerDisplayNameUpdate extends jspb.Message {
  getDisplayname(): string;
  setDisplayname(value: string): PlayerDisplayNameUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerDisplayNameUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerDisplayNameUpdate): PlayerDisplayNameUpdate.AsObject;
  static serializeBinaryToWriter(message: PlayerDisplayNameUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerDisplayNameUpdate;
  static deserializeBinaryFromReader(message: PlayerDisplayNameUpdate, reader: jspb.BinaryReader): PlayerDisplayNameUpdate;
}

export namespace PlayerDisplayNameUpdate {
  export type AsObject = {
    displayname: string,
  }
}

export enum NavigationPath { 
  WELCOME = 0,
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
