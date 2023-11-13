import './Score.css'

type Props = {
  p1winner: number
  p2winner: number
  ties: number
}

const Score = ({ p1winner, p2winner, ties }: Props) => {
  return (
    <>
      <div
        className='score shadow'
        style={{ backgroundColor: 'var(--turquoise)' }}
      >
        <p>Player 1</p>
        <span>{p1winner} Wins</span>
      </div>
      <div
        className='score shadow'
        style={{ backgroundColor: 'var(--light-gray)' }}
      >
        <p>Ties</p>
        <span>{ties}</span>
      </div>
      <div
        className='score shadow'
        style={{ backgroundColor: 'var(--yellow)' }}
      >
        <p>Player 2</p>
        <span>{p2winner} Wins</span>
      </div>
    </>
  )
}

export default Score
