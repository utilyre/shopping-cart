import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Cart } from './pages/Cart'
import { Landing } from './pages/Landing'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Store } from './pages/Store'

const Main = styled.main`
  margin-block-start: 5rem;
`

export const App = () => {
  return (
    <>
      <Navbar />

      <Main>
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />

          <Route path='/store' element={<Store />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Main>
    </>
  )
}
