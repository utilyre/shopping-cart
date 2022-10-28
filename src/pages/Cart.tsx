import styled from 'styled-components'

import { Loading } from '../components/Loading'
import { useCart } from '../contexts/Cart'
import { useItems } from '../services/useItems'
import { formatCurrency } from '../utils/currency'

const Container = styled.div`
  padding-inline: 8rem;
  padding-block-end: 4rem;
  display: flex;
  flex-direction: column;
`

const Heading = styled.h1`
  font-size: 36pt;
  font-weight: 400;
  text-align: center;
  margin-block-end: 2rem;
`

const Order = styled.div`
  display: flex;
  align-items: center;
  min-height: 10rem;
  max-height: 12rem;
  margin-block: 1rem;
  border-radius: 1rem;
  background-color: var(--surface);
  color: var(--on-surface);
  overflow: hidden;
`

const Cover = styled.img`
  object-fit: cover;
  width: 12rem;
  align-self: stretch;
`

const Details = styled.div`
  margin-inline-start: 2rem;
`

const Name = styled.h2`
  font-size: 24pt;
  font-weight: 400;
`

const Brief = styled.p`
  margin-inline: 1rem;
  margin-block-start: 0.5rem;
  max-height: calc(var(--line-height) * 2);
  overflow: hidden;
`

const PriceRow = styled.div`
  display: flex;
  margin-block-start: 0.5rem;
`

const Price = styled.span`
  font-size: 12pt;
  font-weight: 300;
  color: var(--on-surface-alt);

  &.subtotal {
    font-size: 14pt;
    font-weight: 400;
    color: var(--secondary);
  }
`

const Quantity = styled.span`
  font-size: 16pt;
  font-weight: 400;
  color: var(--on-surface-alt);
`

const Purchase = styled.button`
  font-size: 16pt;
  font-weight: 500;
  align-self: flex-end;
  margin-inline-end: 2rem;
  margin-block-start: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
  color: var(--on-secondary);
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition-timing-function: ease;
  transition-duration: 300ms;
  transition-property: background-color, color, padding-inline;

  &:hover {
    background-color: var(--secondary-variant);
    color: var(--on-secondary-variant);
    padding-inline: 1.5rem;
  }
`

export const Cart = () => {
  const { data, isLoading } = useItems()
  const { orders } = useCart()

  if (isLoading) return <Loading />

  const ids = orders.map((order) => order.id)
  const items = ids.map((id) => ({
    ...data!.find((item) => item.id === id),
    ...orders.find((order) => order.id === id),
  }))

  return (
    <Container>
      <Heading>Cart</Heading>

      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <Order key={item.id}>
              <Cover alt={item.brief} src={item.image} />

              <Details>
                <Name>{item.name}</Name>
                <Brief>{item.brief}</Brief>

                <PriceRow>
                  <Price>{formatCurrency(item.price ?? 0)}</Price>&nbsp;x&nbsp;
                  <Quantity>{item.quantity}</Quantity>&nbsp;=&nbsp;
                  <Price className='subtotal'>
                    {formatCurrency((item.price ?? 0) * (item.quantity ?? 0))}
                  </Price>
                </PriceRow>
              </Details>
            </Order>
          ))}

          <Purchase>Purchase</Purchase>
        </>
      ) : (
        <h2>Your cart is empty</h2>
      )}
    </Container>
  )
}
