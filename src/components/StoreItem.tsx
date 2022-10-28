import { BsCartPlusFill } from 'react-icons/bs'
import styled from 'styled-components'

import { formatCurrency } from '../utils/currency'

const Card = styled.div`
  background-color: var(--surface);
  color: var(--on-surface);
  border-radius: 20px;
  width: 15rem;
  height: 18rem;
  overflow: hidden;

  --blur-strength: 0.6px;

  &:hover {
    --blur-strength: 0;
  }
`

const Cover = styled.img`
  object-fit: cover;
  width: 100%;
  height: 10rem;
  filter: blur(var(--blur-strength));
  transition: 150ms ease filter;
`

const Details = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const Name = styled.h2`
  font-size: 20pt;
  font-weight: 400;
`

const Price = styled.span`
  font-size: 12pt;
  font-weight: 300;
  color: var(--on-surface-alt);
`

const Actions = styled.div`
  display: flex;
`

const Button = styled.button`
  background-color: var(--secondary);
  color: var(--on-secondary);
  height: 2rem;
  border: none;
  margin-block-start: 1rem;
  margin-inline: auto;
  font-size: 12pt;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  transition-timing-function: ease;
  transition-duration: 300ms;
  transition-property: background-color, color, transform;

  &:hover {
    background-color: var(--secondary-variant);
    color: var(--on-secondary-variant);
    transform: translate(0, -2px);
  }
`

type Props = {
  id: number
  image: string
  name: string
  brief: string
  price: number

  quantity: number
  addToCart: () => void
  decrementQuantity: () => void
  incrementQuantity: () => void
}

export const StoreItem = ({
  id,
  image,
  name,
  brief,
  price,

  quantity,
  addToCart,
  decrementQuantity,
  incrementQuantity,
}: Props) => {
  return (
    <Card>
      <Cover alt={brief} src={image} />

      <Details>
        <Name title={brief}>{name}</Name>
        <Price>{formatCurrency(price)}</Price>
      </Details>

      <Actions>
        {quantity > 0 ? (
          <>
            <Button onClick={decrementQuantity}>-</Button>
            <span>{quantity}</span>
            <Button onClick={incrementQuantity}>+</Button>
          </>
        ) : (
          <Button onClick={addToCart}>
            <BsCartPlusFill /> Add to Cart
          </Button>
        )}
      </Actions>
    </Card>
  )
}
