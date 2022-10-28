import { BounceLoader } from 'react-spinners'
import styled from 'styled-components'

const Container = styled.div`
  margin-block-start: 8rem;
  display: flex;
  justify-content: center;
`

type Props = {
  size?: number
}

export const Loading = ({ size = 100 }: Props) => {
  return (
    <Container>
      <BounceLoader loading color='var(--primary)' size={size} />
    </Container>
  )
}
