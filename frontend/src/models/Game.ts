export class Game {
    id: string
    player1Id: string
    player2Id: string
    constructor(id: string, player1Id: string, player2Id: string) {
        this.id = id
        this.player1Id = player1Id
        this.player2Id = player2Id
    }
}
