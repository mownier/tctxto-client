// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var tctxto_pb = require('./tctxto_pb.js');

function serialize_server_CreateGameRequest(arg) {
  if (!(arg instanceof tctxto_pb.CreateGameRequest)) {
    throw new Error('Expected argument of type server.CreateGameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_CreateGameRequest(buffer_arg) {
  return tctxto_pb.CreateGameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_CreateLobbyReply(arg) {
  if (!(arg instanceof tctxto_pb.CreateLobbyReply)) {
    throw new Error('Expected argument of type server.CreateLobbyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_CreateLobbyReply(buffer_arg) {
  return tctxto_pb.CreateLobbyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_CreateLobbyRequest(arg) {
  if (!(arg instanceof tctxto_pb.CreateLobbyRequest)) {
    throw new Error('Expected argument of type server.CreateLobbyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_CreateLobbyRequest(buffer_arg) {
  return tctxto_pb.CreateLobbyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_Empty(arg) {
  if (!(arg instanceof tctxto_pb.Empty)) {
    throw new Error('Expected argument of type server.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_Empty(buffer_arg) {
  return tctxto_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_GameCreatedUpdate(arg) {
  if (!(arg instanceof tctxto_pb.GameCreatedUpdate)) {
    throw new Error('Expected argument of type server.GameCreatedUpdate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_GameCreatedUpdate(buffer_arg) {
  return tctxto_pb.GameCreatedUpdate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_GameUpdate(arg) {
  if (!(arg instanceof tctxto_pb.GameUpdate)) {
    throw new Error('Expected argument of type server.GameUpdate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_GameUpdate(buffer_arg) {
  return tctxto_pb.GameUpdate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_GameUpdateSubscription(arg) {
  if (!(arg instanceof tctxto_pb.GameUpdateSubscription)) {
    throw new Error('Expected argument of type server.GameUpdateSubscription');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_GameUpdateSubscription(buffer_arg) {
  return tctxto_pb.GameUpdateSubscription.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_JoinLobbyReply(arg) {
  if (!(arg instanceof tctxto_pb.JoinLobbyReply)) {
    throw new Error('Expected argument of type server.JoinLobbyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_JoinLobbyReply(buffer_arg) {
  return tctxto_pb.JoinLobbyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_JoinLobbyRequest(arg) {
  if (!(arg instanceof tctxto_pb.JoinLobbyRequest)) {
    throw new Error('Expected argument of type server.JoinLobbyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_JoinLobbyRequest(buffer_arg) {
  return tctxto_pb.JoinLobbyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_LobbySubscription(arg) {
  if (!(arg instanceof tctxto_pb.LobbySubscription)) {
    throw new Error('Expected argument of type server.LobbySubscription');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_LobbySubscription(buffer_arg) {
  return tctxto_pb.LobbySubscription.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_MoveRequest(arg) {
  if (!(arg instanceof tctxto_pb.MoveRequest)) {
    throw new Error('Expected argument of type server.MoveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_server_MoveRequest(buffer_arg) {
  return tctxto_pb.MoveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TicTacToeService = exports.TicTacToeService = {
  createLobby: {
    path: '/server.TicTacToe/CreateLobby',
    requestStream: false,
    responseStream: false,
    requestType: tctxto_pb.CreateLobbyRequest,
    responseType: tctxto_pb.CreateLobbyReply,
    requestSerialize: serialize_server_CreateLobbyRequest,
    requestDeserialize: deserialize_server_CreateLobbyRequest,
    responseSerialize: serialize_server_CreateLobbyReply,
    responseDeserialize: deserialize_server_CreateLobbyReply,
  },
  joinLobby: {
    path: '/server.TicTacToe/JoinLobby',
    requestStream: false,
    responseStream: false,
    requestType: tctxto_pb.JoinLobbyRequest,
    responseType: tctxto_pb.JoinLobbyReply,
    requestSerialize: serialize_server_JoinLobbyRequest,
    requestDeserialize: deserialize_server_JoinLobbyRequest,
    responseSerialize: serialize_server_JoinLobbyReply,
    responseDeserialize: deserialize_server_JoinLobbyReply,
  },
  createGame: {
    path: '/server.TicTacToe/CreateGame',
    requestStream: false,
    responseStream: false,
    requestType: tctxto_pb.CreateGameRequest,
    responseType: tctxto_pb.Empty,
    requestSerialize: serialize_server_CreateGameRequest,
    requestDeserialize: deserialize_server_CreateGameRequest,
    responseSerialize: serialize_server_Empty,
    responseDeserialize: deserialize_server_Empty,
  },
  makeMoke: {
    path: '/server.TicTacToe/MakeMoke',
    requestStream: false,
    responseStream: false,
    requestType: tctxto_pb.MoveRequest,
    responseType: tctxto_pb.Empty,
    requestSerialize: serialize_server_MoveRequest,
    requestDeserialize: deserialize_server_MoveRequest,
    responseSerialize: serialize_server_Empty,
    responseDeserialize: deserialize_server_Empty,
  },
  subscribeGameUpdates: {
    path: '/server.TicTacToe/SubscribeGameUpdates',
    requestStream: false,
    responseStream: true,
    requestType: tctxto_pb.GameUpdateSubscription,
    responseType: tctxto_pb.GameUpdate,
    requestSerialize: serialize_server_GameUpdateSubscription,
    requestDeserialize: deserialize_server_GameUpdateSubscription,
    responseSerialize: serialize_server_GameUpdate,
    responseDeserialize: deserialize_server_GameUpdate,
  },
  subscribeToGameCreation: {
    path: '/server.TicTacToe/SubscribeToGameCreation',
    requestStream: false,
    responseStream: true,
    requestType: tctxto_pb.LobbySubscription,
    responseType: tctxto_pb.GameCreatedUpdate,
    requestSerialize: serialize_server_LobbySubscription,
    requestDeserialize: deserialize_server_LobbySubscription,
    responseSerialize: serialize_server_GameCreatedUpdate,
    responseDeserialize: deserialize_server_GameCreatedUpdate,
  },
};

exports.TicTacToeClient = grpc.makeGenericClientConstructor(TicTacToeService, 'TicTacToe');
