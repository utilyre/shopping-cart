import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'

import { useUser } from '../contexts/User'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Heading = styled.h1`
  margin-block-end: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 12pt;
  transform: translate(1rem, 0.5rem);
  background-color: var(--background);
  padding-inline: 5px;
  width: fit-content;
`

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  border: solid 2px var(--surface);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  width: 15rem;
  transition: 150ms ease border-color;

  &:focus {
    border: solid 2px var(--secondary);
  }
`

const Button = styled.button`
  font-weight: 600;
  font-size: 12pt;
  margin-block-start: 2rem;
  padding: 0.5rem;
  background-color: var(--secondary);
  color: var(--on-secondary);
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition-duration: 300ms;
  transition-timing-function: ease;
  transition-property: background-color, color;

  &:hover,
  &:focus {
    background-color: var(--secondary-variant);
    color: var(--on-secondary-variant);
  }
`

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailRef = useRef<HTMLInputElement>(null)

  const { user, signin } = useUser()

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    signin(email, password)

    setEmail('')
    setPassword('')
  }

  return user === undefined ? (
    <Container>
      <Heading>Sign In</Heading>

      <Form onSubmit={submitHandler}>
        <Label>Email</Label>
        <Input
          type='email'
          required
          ref={emailRef}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <Label>Password</Label>
        <Input
          type='password'
          required
          minLength={8}
          maxLength={256}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <Button type='submit'>Login</Button>
      </Form>
    </Container>
  ) : (
    <Navigate to='/store' replace />
  )
}
