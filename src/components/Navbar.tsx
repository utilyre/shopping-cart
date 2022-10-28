import { AiFillShop } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Profile } from './Profile'

const Nav = styled.nav`
  z-index: 1;
  background-color: var(--primary);
  color: var(--on-primary);
  padding-inline: 1.5rem;
  height: 2.2rem;
  margin-inline: 2rem;
  margin-block-start: 1rem;
  border-radius: 100px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
`

const Items = styled.ul`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Item = styled.li`
  &.landing {
    margin-inline-end: 1rem;
  }

  &.right-pane {
    margin-inline-start: auto;
  }
`

const Link = styled(NavLink)`
  font-size: 12pt;
  color: var(--on-primary);
  text-decoration: none;

  &.active {
    text-decoration: underline;
  }

  &.landing {
    font-size: 18pt;
    color: var(--secondary);
  }
`

export const Navbar = () => {
  return (
    <Nav>
      <Items>
        <Item className='landing'>
          <Link to='/' className='landing'>
            <AiFillShop
              title='landing'
              style={{ transform: 'translate(0, 4px)' }}
            />
          </Link>
        </Item>

        <Item>
          <Link to='/store'>Store</Link>
        </Item>
        <Item>
          <Link to='/about'>About</Link>
        </Item>

        <Item className='right-pane'>
          <Link to='/cart'>Cart</Link>
        </Item>
        <Item>
          <Profile />
        </Item>
      </Items>
    </Nav>
  )
}
