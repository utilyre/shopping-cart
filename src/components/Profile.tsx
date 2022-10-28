import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { useUser } from '../contexts/User'

const Link = styled(NavLink)`
  color: var(--on-primary);
  text-decoration: none;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  margin-inline: 0.25rem;
  font-weight: 500;
  font-size: 11pt;
  cursor: pointer;

  &.signin {
    border: solid 2px var(--secondary);
    background: none;
  }

  &.signup {
    background-color: var(--secondary);
    color: var(--on-secondary);
  }
`

const Cover = styled.img`
  width: 1.2rem;
`

export const Profile = () => {
  const { user } = useUser()

  return user === undefined ? (
    <>
      <Link to='/signin' className='signin'>
        Sign In
      </Link>
      <Link to='/signup' className='signup'>
        Sign Up
      </Link>
    </>
  ) : (
    <Cover title={user.name} alt={user.email} src='/profiles/default.png' />
  )
}
