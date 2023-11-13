import React, { useState } from 'react'
import classNames from 'classnames'
import './Menu.css'

type Props = {
  onAction(action: 'reset' | 'new-round'): void
}

const Menu = ({ onAction }: Props) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='menu'>
      <button className='menu-btn' onClick={() => setShowMenu((prev) => !prev)}>
        Actions
        <i
          className={classNames(
            'fa-solid',
            showMenu ? 'fa-chevron-up' : 'fa-chevron-down'
          )}
        ></i>
      </button>

      {showMenu && (
        <div className='items border'>
          <button onClick={() => onAction('reset')}>Reset</button>
          <button onClick={() => onAction('new-round')}>New around</button>
        </div>
      )}
    </div>
  )
}

export default Menu
