import { GameState, Player } from './types'

export const players: Player[] = [
  { id: 0, name: 'Player 1', iconClass: 'fa-x', colorClass: 'turquoise' },
  { id: 1, name: 'Player 2', iconClass: 'fa-o', colorClass: 'yellow' },
]

export const deriveGame = (state: GameState) => {
  const currentPlayer = players[state.currentGameMoves.length % 2]

  let winner = null

  const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ]

  // Get the moves of each player with the move of each player
  for (const player of players) {
    const playerMoves = state.currentGameMoves.filter(
      (move) => move.player.id === player.id
    )
    // Get a list with each player squareId move
    const playerMovesList = playerMoves.map((square) => square.squareId)

    for (const pattern of winningPatterns) {
      if (pattern.every((value) => playerMovesList.includes(value))) {
        winner = player
      }
    }
  }

  return {
    currentPlayer,
    moves: state.currentGameMoves,
    status: {
      winner,
      isComplete: state.currentGameMoves.length === 9 || winner != null,
    },
  }
}

export const deriveStats = (state: GameState) => {
  const playerStats = players.map((player) => {
    const getGameWinner = state.history.currentRoundGames.filter(
      (game) => game.status.winner?.id === player.id
    )
    const getWins = getGameWinner.length

    return {
      ...player,
      wins: getWins,
    }
  })

  const playersTies = state.history.currentRoundGames.filter(
    (game) => game.status.winner === null
  ).length

  return {
    playerWithStats: playerStats,
    ties: playersTies,
  }
}
