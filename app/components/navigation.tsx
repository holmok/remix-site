import { useState } from 'react'
import { MouseEvent } from 'react'

export interface NavigationProps {
  handleNavigate: (event: MouseEvent<HTMLAnchorElement>) => void
  items: { title: string; url: string }[]
}

export default function Navigation(props: NavigationProps) {
  const { handleNavigate, items } = props

  const [showMenu, setShowMenu] = useState(false)

  function handleMenuToggle(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    setShowMenu(!showMenu)
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    setShowMenu(false)
    handleNavigate(event)
  }

  return (
    <div className='nav'>
      <nav>
        <a className='menu-toggle' href='#nav' onClick={handleMenuToggle}>
          ☰
        </a>
        {showMenu && (
          <ul className='menu'>
            {items.map((item) => (
              <li key={item.url}>
                <a data-url={item.url} href={item.url} onClick={handleClick}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  )
}
