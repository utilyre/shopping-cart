import styled from 'styled-components'

import { Loading } from '../components/Loading'
import { StoreItem } from '../components/StoreItem'
import { Order, useCart } from '../contexts/Cart'
import { useItems } from '../services/useItems'

const Heading = styled.h1`
  font-size: 36pt;
  font-weight: 400;
  text-align: center;
`

const Grid = styled.div`
  max-width: 60vw;
  margin-inline: auto;
  margin-block-start: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  @media only screen and (max-width: 110rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 72rem) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Store = () => {
  const { data, isLoading } = useItems()
  const { orders, addOrder, setOrderQuantity } = useCart()

  return (
    <div>
      <Heading>Store</Heading>

      {isLoading ? (
        <Loading />
      ) : (
        <Grid>
          {data?.map((item) => (
            <StoreItem
              key={item.id}
              {...item}
              quantity={
                orders.find((order: Order) => order.id === item.id)?.quantity ??
                0
              }
              addToCart={() => addOrder({ id: item.id, quantity: 1 })}
              decrementQuantity={() =>
                setOrderQuantity(item.id, (prev: number) => prev - 1)
              }
              incrementQuantity={() =>
                setOrderQuantity(item.id, (prev: number) => prev + 1)
              }
            />
          ))}
        </Grid>
      )}
    </div>
  )
}
