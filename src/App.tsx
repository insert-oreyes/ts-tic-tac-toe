import { useLocalStorage } from './useLocalStorage'
import './App.css'
import { deriveGame, deriveStats } from './utils'
import { GameState, Player } from './types'
import classNames from 'classnames'
import Menu from './components/Menu'
import Score from './components/Score'
import Footer from './components/Footer'
import Modal from './components/Modal'

const initialState: GameState = {
  currentGameMoves: [],
  history: {
    currentRoundGames: [],
    allGames: [],
  },
}

const App = () => {
  const [state, setState] = useLocalStorage('game-state-key', initialState)

  const squareNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const game = deriveGame(state)

  const handlePlayerMove = (player: Player, squareId: number) => {
    setState((prev) => {
      const stateClone = structuredClone(prev)
      stateClone.currentGameMoves.push({
        player,
        squareId,
      })
      return stateClone
    })
  }

  const showModal = game.status.isComplete

  const handleResetGame = (isNewGame: boolean) => {
    setState((prev) => {
      const { moves, status } = game
      const stateClone = structuredClone(prev)

      if (status.isComplete) {
        stateClone.history.currentRoundGames.push({ moves, status })
      }
      stateClone.currentGameMoves = []

      if (isNewGame) {
        stateClone.history.allGames.push(
          ...stateClone.history.currentRoundGames
        )
        stateClone.history.currentRoundGames = []
      }

      return stateClone
    })
  }

  const stats = deriveStats(state)

  return (
    <>
      <main className='grid'>
        <div className={classNames('turn', game.currentPlayer.colorClass)}>
          <i
            className={classNames('fa-solid', game.currentPlayer.iconClass)}
          ></i>
          <p>{game.currentPlayer.name}, you're up!</p>
        </div>

        <Menu
          onAction={(action) => {
            handleResetGame(action === 'new-round')
          }}
        />

        {squareNumbers.map((squareId) => {
          const existingMove = game.moves.find(
            (move) => move.squareId === squareId
          )

          return (
            <div
              className='square shadow'
              key={squareId}
              onClick={() => {
                if (existingMove) return
                handlePlayerMove(game.currentPlayer, squareId)
              }}
            >
              {existingMove && (
                <i
                  className={classNames(
                    'fa-solid',
                    existingMove.player.iconClass,
                    existingMove.player.colorClass
                  )}
                ></i>
              )}
            </div>
          )
        })}
        <Score
          p1winner={stats.playerWithStats[0].wins}
          p2winner={stats.playerWithStats[1].wins}
          ties={stats.ties}
        />
      </main>

      <Footer />

      {showModal && (
        <Modal
          playAgain={() => {
            handleResetGame(false)
          }}
          message={
            game.status.winner
              ? `${game.status.winner.name} is the winner`
              : 'It is a tie'
          }
        />
      )}
    </>
  )
}

export default App
