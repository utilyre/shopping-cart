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

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRepeatRef = useRef<HTMLInputElement>(null)

  const { user, signup } = useUser()

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  useEffect(() => {
    if (password === passwordRepeat) {
      passwordRepeatRef.current?.setCustomValidity('')
      return
    }

    passwordRepeatRef.current?.setCustomValidity(
      'Please enter the same password as above'
    )
  }, [password, passwordRepeat])

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== passwordRepeat) {
      passwordRepeatRef.current?.setCustomValidity(
        'Please enter the same password as above'
      )
      return
    }

    signup(name, email, password)

    setName('')
    setEmail('')
    setPassword('')
    setPasswordRepeat('')
  }

  return user === undefined ? (
    <Container>
      <Heading>Sign Up</Heading>

      <Form onSubmit={submitHandler}>
        <Label>Username</Label>
        <Input
          type='text'
          required
          minLength={3}
          maxLength={64}
          ref={nameRef}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <Label>Email</Label>
        <Input
          type='email'
          required
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

        <Label>Re-enter password</Label>
        <Input
          type='password'
          required
          ref={passwordRepeatRef}
          value={passwordRepeat}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPasswordRepeat(e.target.value)
          }
        />

        <Button type='submit'>Sign Up</Button>
      </Form>
    </Container>
  ) : (
    <Navigate to='/store' replace />
  )
}
