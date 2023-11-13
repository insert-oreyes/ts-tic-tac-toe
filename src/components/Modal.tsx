import React from 'react'
import './Modal.css'

type Props = {
  message: string
  playAgain(): void
}

const Modal = ({ message, playAgain }: Props) => {
  return (
    <div className='modal'>
      <div className='modal-contents'>
        <p>{message}</p>
        <button onClick={playAgain}>Play again</button>
      </div>
    </div>
  )
}

export default Modal
