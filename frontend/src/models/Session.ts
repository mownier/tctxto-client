import { Game } from "./Game"
import { Lobby } from "./Lobby"
import { Player } from "./Player"

export class Session {
    id: string
    player: Player
    lobby: Lobby
    game: Game | null
    constructor(id: string, player: Player, lobby: Lobby, game: Game | null) {
        this.id = id
        this.player = player
        this.lobby = lobby
        this.game = game
    }
}
